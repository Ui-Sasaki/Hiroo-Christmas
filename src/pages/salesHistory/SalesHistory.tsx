import React, { useEffect, useState } from "react";

type TransactionItem = {
  id: number;
  quantity: number;
  subtotal: number;
  product: { id: number; name: string; price: number };
};

type Transaction = {
  id: number;
  createdAt: string;
  total: number;
  items: TransactionItem[];
};

const SalesHistory = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/transactions");
      const json = await res.json();
      setData(json.transactions || []);
      setLoading(false);
    };

    load();
  }, []);

  const totalSales = data.reduce((sum, tx) => sum + tx.total, 0);

  return (
    <div className="flex-1 bg-[#E8F3EF] p-10">
      <h1 className="text-center text-3xl font-bold text-green-700 mb-6">
        売上管理
      </h1>

      {/* 🔽 最新UI：テーブルを大きく中央へ */}
      <div className="w-[90%] mx-auto mt-6 scale-[1.15] origin-top bg-white rounded-lg shadow p-6">
        
        {/* 総売上 */}
        <div className="text-right text-sm mb-3">
          総売上：<span className="font-bold text-green-700">{totalSales}円</span>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">読み込み中...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500 text-center">まだ決済履歴がありません。</p>
        ) : (
          <table className="w-full text-sm">
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
              {data.map((tx) =>
                tx.items.map((item, index) => (
                  <tr
                    key={`${tx.id}-${item.id}`}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    {index === 0 && (
                      <td
                        className="py-2 px-3 align-top text-left text-gray-700"
                        rowSpan={tx.items.length}
                      >
                        {new Date(tx.createdAt).toLocaleTimeString("ja-JP", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                    )}

                    <td className="py-2 px-3">{item.product.name}</td>
                    <td className="py-2 px-3 text-right">{item.quantity}</td>
                    <td className="py-2 px-3 text-right">{item.subtotal}円</td>

                    {index === 0 && (
                      <td
                        className="py-2 px-3 text-right font-bold text-green-700 align-top"
                        rowSpan={tx.items.length}
                      >
                        {tx.total}円
                      </td>
                    )}
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

export default SalesHistory;