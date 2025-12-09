// src/pages/sales/Sales.tsx
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  sold: number;
};

type SelectedLine = {
  product: Product;
  quantity: number;
};

const Sales: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // productId -> { product, quantity }
  const [selected, setSelected] = useState<Record<number, SelectedLine>>({});

  // 会計完了アニメ用
  const [showComplete, setShowComplete] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // ---- Prisma から商品を取ってくる ----
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Vite 側の proxy で /api → backend:3000 に飛ぶ
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products ?? []);
      } catch (err) {
        console.error(err);
        setError("商品一覧の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ---- カードをクリックしたとき：タリーに追加 or 個数+1 ----
  const handleAddProduct = (product: Product) => {
    setSelected((prev) => {
      const next = { ...prev };
      const existing = next[product.id];

      if (existing) {
        next[product.id] = { product, quantity: existing.quantity + 1 };
      } else {
        next[product.id] = { product, quantity: 1 };
      }
      return next;
    });
  };

  // ---- 左側の +/- ボタン ----
  const handleChangeQuantity = (productId: number, delta: number) => {
    setSelected((prev) => {
      const current = prev[productId];
      if (!current) return prev;

      const newQty = current.quantity + delta;
      const copy = { ...prev };

      if (newQty <= 0) {
        delete copy[productId];
      } else {
        copy[productId] = { ...current, quantity: newQty };
      }
      return copy;
    });
  };

  // ---- 合計 ----
  const lines = Object.values(selected);
  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);
  const totalPrice = lines.reduce(
    (sum, line) => sum + line.quantity * line.product.price,
    0
  );

  // ---- 会計ボタン押したとき ----
  const handleCheckout = async () => {
    if (lines.length === 0 || checkoutLoading) return;

    try {
      setCheckoutLoading(true);

      const payload = {
        total: totalPrice,
        items: lines.map((line) => ({
          productId: line.product.id,
          quantity: line.quantity,
          subtotal: line.quantity * line.product.price,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("CHECKOUT ERROR", await res.text());
        alert("会計の保存に失敗しました…");
        return;
      }

      // 成功：タリーをリセットしてアニメーション
      setSelected({});
      setShowComplete(true);
      setTimeout(() => setShowComplete(false), 1400);
    } catch (e) {
      console.error(e);
      alert("サーバーエラーが発生しました。");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-y-auto h-[calc(100vh-88px)] gap-7 p-7 relative">
      {/* 左：タリー */}
      <div className="w-[360px] bg-white rounded shadow-md flex flex-col">
        {/* ヘッダー */}
        <div className="flex justify-between px-6 py-3 bg-green-50 border-b text-sm font-semibold">
          <span className="w-[55%]">商品名</span>
          <span className="w-[20%] text-center">個数</span>
          <span className="w-[25%] text-right">価格</span>
        </div>

        {/* 本体 */}
        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              まだ商品が選択されていません。
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.product.id}
                className="flex items-center px-6 py-2 border-b text-sm"
              >
                <span className="w-[55%] truncate">{line.product.name}</span>

                <div className="w-[20%] flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleChangeQuantity(line.product.id, -1)}
                    className="w-7 h-7 rounded-full bg-red-500 text-white text-sm flex items-center justify-center"
                  >
                    −
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleChangeQuantity(line.product.id, +1)}
                    className="w-7 h-7 rounded-full bg-green-600 text-white text-sm flex items-center justify-center"
                  >
                    ＋
                  </button>
                </div>

                <span className="w-[25%] text-right">
                  {line.product.price}円
                </span>
              </div>
            ))
          )}
        </div>

        {/* フッター（合計） */}
        <div className="flex items-center justify-between px-6 py-3 bg-green-700 text-white text-sm">
          <span>合計</span>
          <span>{totalItems}点</span>
          <span>{totalPrice}円</span>
        </div>
      </div>

      {/* 右：商品カード ＋ 会計ボタン */}
      <div className="flex-1 flex flex-col">
        {/* カード一覧 */}
        <div className="flex-1">
          {loading && (
            <div className="h-full flex items-center justify-center text-gray-500">
              読み込み中…
            </div>
          )}

          {error && !loading && (
            <div className="h-full flex items-center justify-center text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-4 gap-6 auto-rows-[180px]">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleAddProduct(p)}
                  className="bg-white rounded shadow-md p-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <div className="text-xs text-gray-500 mb-1">飲み物</div>
                  <div className="text-lg font-semibold mb-2 break-words">
                    {p.name}
                  </div>
                  <div className="text-green-700 font-bold">{p.price}円</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 会計ボタン（四角＋矢印） */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleCheckout}
            disabled={checkoutLoading || lines.length === 0}
            className="px-16 py-4 rounded-xl bg-red-500 text-white text-2xl font-bold shadow-lg 
                       hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed
                       flex items-center gap-4"
          >
            {checkoutLoading ? "会計中..." : "会計"}
            {!checkoutLoading && <span className="text-3xl">➜</span>}
          </button>
        </div>
      </div>

      {/* ✅ 会計完了オーバーレイ */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-4">
        <div className="checkmark">
  <svg
    className="checkmark-svg"
    viewBox="0 0 52 52"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle className="checkmark-circle" cx="26" cy="26" r="24" />
    <path className="checkmark-check" d="M14 27l8 8 16-16" />
  </svg>
</div>
            <p className="text-2xl font-bold text-green-700 mt-2">会計完了</p>
            <p className="text-sm text-gray-500">次の会計に進んでください。</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;