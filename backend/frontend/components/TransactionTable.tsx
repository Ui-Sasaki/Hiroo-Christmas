// src/components/TransactionTable.tsx
import React, { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type TransactionItem = {
  id: number;
  productId: number;
  quantity: number;
  subtotal: number;
  product: Product;
};

type Transaction = {
  id: number;
  createdAt: string; // ISO文字列
  total: number;
  items: TransactionItem[];
};

type ViewMode = "history" | "summary";
type ProductFilter = "all" | number;

const TransactionTable: React.FC = () => {
  const [view, setView] = useState<ViewMode>("history");
  const [filter, setFilter] = useState<ProductFilter>("all");

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---- データ取得 ----
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setTransactions(data.transactions ?? []);
      } catch (e) {
        console.error(e);
        setError("決済履歴の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ---- ドロップダウン用：商品リスト ----
  const productOptions = useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();

    for (const tx of transactions) {
      for (const item of tx.items) {
        if (!item.product) continue;
        if (!map.has(item.product.id)) {
          map.set(item.product.id, {
            id: item.product.id,
            name: item.product.name,
          });
        }
      }
    }

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "ja")
    );
  }, [transactions]);

  // ---- 決済履歴用：行をフラットに & フィルタ ----
  const historyRows = useMemo(() => {
    const allRows = transactions.flatMap((tx) =>
      tx.items.map((item) => ({
        id: `${tx.id}-${item.id}`,
        time: new Date(tx.createdAt),
        productId: item.productId,
        productName: item.product?.name ?? "不明な商品",
        quantity: item.quantity,
        subtotal: item.subtotal,
        total: tx.total,
      }))
    );

    if (filter === "all") return allRows;
    return allRows.filter((row) => row.productId === filter);
  }, [transactions, filter]);

  // ---- 集計用：商品ごとに合計 & フィルタ ----
  const summaryRows = useMemo(() => {
    const map = new Map<
      number,
      { productId: number; name: string; totalQty: number; totalAmount: number }
    >();

    for (const tx of transactions) {
      for (const item of tx.items) {
        const pid = item.productId;
        const name = item.product?.name ?? "不明な商品";

        const prev = map.get(pid) ?? {
          productId: pid,
          name,
          totalQty: 0,
          totalAmount: 0,
        };

        prev.totalQty += item.quantity;
        prev.totalAmount += item.subtotal;
        map.set(pid, prev);
      }
    }

    let rows = Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "ja")
    );

    if (filter !== "all") {
      rows = rows.filter((r) => r.productId === filter);
    }

    return rows;
  }, [transactions, filter]);

  // ---- 総売上金額（フィルタ関係なく全体） ----
  const allTotal = useMemo(
    () => transactions.reduce((sum, tx) => sum + tx.total, 0),
    [transactions]
  );

  // ---- 総売上「個数」（フィルタ反映：全品 or 特定商品）----
  const totalQuantityFiltered = useMemo(() => {
    if (filter === "all") {
      // 全商品の販売個数合計
      return transactions.reduce(
        (sum, tx) =>
          sum +
          tx.items.reduce((inner, item) => inner + item.quantity, 0),
        0
      );
    } else {
      // 指定した productId の販売個数合計
      return transactions.reduce(
        (sum, tx) =>
          sum +
          tx.items
            .filter((item) => item.productId === filter)
            .reduce((inner, item) => inner + item.quantity, 0),
        0
      );
    }
  }, [transactions, filter]);

  return (
    <div className="bg-white rounded shadow-md p-6 min-h-[500px] flex flex-col">
      {/* 上部バー：タブ + ドロップダウン + 総売上 + 総個数 */}
      <div className="flex items-center justify-between mb-4 gap-4">
        {/* 左：タブ（決済履歴 / 集計表示） */}
        <div className="inline-flex rounded-full border border-green-600 overflow-hidden">
          <button
            type="button"
            onClick={() => setView("history")}
            className={`px-6 py-2 text-sm font-semibold ${
              view === "history"
                ? "bg-green-600 text-white"
                : "bg-white text-green-700"
            }`}
          >
            決済履歴
          </button>
          <button
            type="button"
            onClick={() => setView("summary")}
            className={`px-6 py-2 text-sm font-semibold ${
              view === "summary"
                ? "bg-green-600 text-white"
                : "bg-white text-green-700"
            }`}
          >
            集計表示
          </button>
        </div>

        {/* 中央：商品フィルター */}
     <div className="flex items-center gap-2 ml-auto">
  <span className="text-sm text-gray-600">表示対象：</span>
  <select
    className="border rounded px-3 py-1 text-sm bg-white"
    value={filter === "all" ? "all" : String(filter)}
    onChange={(e) => {
      const v = e.target.value;
      if (v === "all") setFilter("all");
      else setFilter(Number(v));
    }}
  >
    <option value="all">全品</option>
    {productOptions.map((p) => (
      <option key={p.id} value={p.id}>
        {p.name}
      </option>
    ))}
  </select>
</div>
        {/* 右：総売上 ＋ 総売上個数（フィルタ反映） */}
        <div className="text-right text-sm text-gray-500">
          <div>
            総売上：
            <span className="font-bold text-green-700 ml-1">
              {allTotal}円
            </span>
          </div>
          <div className="mt-1">
            総売上個数：
            <span className="font-bold text-green-700 ml-1">
              {totalQuantityFiltered}点
            </span>
          </div>
        </div>
      </div>

      {/* 本体テーブル */}
      <div className="flex-1 overflow-y-auto border rounded-md">
        {loading && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            読み込み中…
          </div>
        )}

        {error && !loading && (
          <div className="h-full flex items-center justify-center text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* 決済履歴ビュー */}
        {!loading && !error && view === "history" && (
          <table className="min-w-full text-sm">
            <thead className="bg-green-50 border-b">
              <tr>
                <th className="py-2 px-3 text-left w-[18%]">時間</th>
                <th className="py-2 px-3 text-left w-[32%]">商品名</th>
                <th className="py-2 px-3 text-right w-[10%]">個数</th>
                <th className="py-2 px-3 text-right w-[15%]">小計</th>
                <th className="py-2 px-3 text-right w-[15%]">合計</th>
              </tr>
            </thead>
            <tbody>
              {historyRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-gray-400 text-sm"
                  >
                    まだ該当する決済データがありません。
                  </td>
                </tr>
              ) : (
                historyRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-2 px-3">
                      {row.time.toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="py-2 px-3">{row.productName}</td>
                    <td className="py-2 px-3 text-right">{row.quantity}</td>
                    <td className="py-2 px-3 text-right">{row.subtotal}円</td>
                    <td className="py-2 px-3 text-right">{row.total}円</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* 集計ビュー */}
        {!loading && !error && view === "summary" && (
          <table className="min-w-full text-sm">
            <thead className="bg-green-50 border-b">
              <tr>
                <th className="py-2 px-3 text-left w-[45%]">商品名</th>
                <th className="py-2 px-3 text-right w-[15%]">販売個数</th>
                <th className="py-2 px-3 text-right w-[20%]">売上合計</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-gray-400 text-sm"
                  >
                    まだ該当する集計データがありません。
                  </td>
                </tr>
              ) : (
                summaryRows.map((row) => (
                  <tr
                    key={row.productId}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-2 px-3">{row.name}</td>
                    <td className="py-2 px-3 text-right">{row.totalQty}</td>
                    <td className="py-2 px-3 text-right">
                      {row.totalAmount}円
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;