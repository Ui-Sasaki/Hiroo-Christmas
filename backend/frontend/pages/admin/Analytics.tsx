// backend/frontend/pages/admin/Analytics.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

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
  createdAt: string;
  total: number;
  items: TransactionItem[];
};

const Analytics: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userRole, setUserRole] = useState<"admin" | "staff" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("userRole");
    if (stored === "admin" || stored === "staff") {
      setUserRole(stored);
    } else {
      setUserRole("staff");
    }
  }, []);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("failed");
        const json = await res.json();
        setTransactions(json.transactions ?? []);
      } catch (e) {
        console.error(e);
        setError("売上データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    fetchTx();
  }, []);

  const { totalAmount, totalQty, txCount } = useMemo(() => {
    let amount = 0;
    let qty = 0;

    for (const tx of transactions) {
      amount += tx.total;
      for (const item of tx.items) qty += item.quantity;
    }

    return { totalAmount: amount, totalQty: qty, txCount: transactions.length };
  }, [transactions]);

  
  const productSummary = useMemo(() => {
    const map = new Map<
      number,
      { productId: number; name: string; totalQty: number; totalAmount: number }
    >();

    for (const tx of transactions) {
      for (const item of tx.items) {
        const key = item.productId;
        const prev =
          map.get(key) ?? {
            productId: key,
            name: item.product?.name ?? "不明な商品",
            totalQty: 0,
            totalAmount: 0,
          };
        prev.totalQty += item.quantity;
        prev.totalAmount += item.subtotal;
        map.set(key, prev);
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => b.totalAmount - a.totalAmount
    );
  }, [transactions]);

  const bestProduct = productSummary[0];
  const maxAmount = productSummary.reduce(
    (max, p) => Math.max(max, p.totalAmount),
    0
  );

  // ===== ③ 時間帯別カーブ =====
  const { hourLabels, hourQuantities } = useMemo(() => {
    const labels = [
      "12:30〜13:29",
      "13:30〜14:29",
      "14:30〜15:29",
      "15:30〜16:29",
      "16:30〜17:00",
    ];
    const buckets = [0, 0, 0, 0, 0];

    const startMinutes = 12 * 60 + 30;

    for (const tx of transactions) {
      const t = new Date(tx.createdAt);
      const minutes = t.getHours() * 60 + t.getMinutes();
      const diff = minutes - startMinutes;

      if (diff < 0 || minutes > 17 * 60) continue;
      const index = Math.floor(diff / 60);
      if (index < 0 || index >= buckets.length) continue;

      const qtyInTx = tx.items.reduce((s, i) => s + i.quantity, 0);
      buckets[index] += qtyInTx;
    }

    return { hourLabels: labels, hourQuantities: buckets };
  }, [transactions]);

  const lineData = {
    labels: hourLabels,
    datasets: [
      {
        label: "1時間ごとの販売個数",
        data: hourQuantities,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true as const },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "販売個数（点）" },
      },
      x: {
        title: { display: true, text: "時間帯" },
      },
    },
  };

  // 管理者以外ならメッセージ
  if (userRole && userRole !== "admin") {
    return (
      <div className="p-10">
        <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
          統計・分析ページは管理者のみ閲覧できます。
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      {loading && (
        <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
          読み込み中…
        </div>
      )}

      {error && !loading && (
        <div className="bg-white rounded-lg shadow p-10 text-center text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <div className="bg-white rounded-lg shadow p-10 text-center text-gray-400">
          まだ決済データがありません。
        </div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <>
          {/* 上の3つのサマリーカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-sm text-gray-500 mb-1">総売上</p>
              <p className="text-3xl font-bold text-green-700">
                {totalAmount.toLocaleString()}円
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-sm text-gray-500 mb-1">総販売個数</p>
              <p className="text-3xl font-bold text-green-700">
                {totalQty.toLocaleString()}個
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-sm text-gray-500 mb-1">決済回数</p>
              <p className="text-3xl font-bold text-green-700">
                {txCount.toLocaleString()}回
              </p>
              {bestProduct && (
                <p className="mt-2 text-sm text-gray-500">
                  一番売れている商品:{" "}
                  <span className="font-semibold">{bestProduct.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* 時間帯別カーブ */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              12:30〜17:00 の時間帯別 販売個数カーブ
            </h2>
            <Line data={lineData} options={lineOptions} />
          </div>

          {/* 下段：左=ランキング / 右=直近決済 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ランキング */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">商品別 売上ランキング</h2>
              {productSummary.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  まだ売上データがありません。
                </p>
              ) : (
                <div className="space-y-3">
                  {productSummary.map((p, index) => {
                    const ratio =
                      maxAmount > 0
                        ? Math.max((p.totalAmount / maxAmount) * 100, 5)
                        : 0;
                    return (
                      <div key={p.productId}>
                        <div className="flex justify-between text-sm mb-1">
                          <div>
                            <span className="inline-block w-6 text-right mr-2 text-gray-500">
                              {index + 1}.
                            </span>
                            <span className="font-medium">{p.name}</span>
                          </div>
                          <div className="text-gray-600">
                            {p.totalQty}個 / {p.totalAmount.toLocaleString()}円
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full"
                            style={{
                              width: `${ratio}%`,
                              background:
                                "linear-gradient(90deg, #4ade80, #22c55e)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 直近決済 */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">直近の決済</h2>
              {transactions.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  まだ決済データがありません。
                </p>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-green-50 border-b">
                    <tr>
                      <th className="py-2 px-3 text-left w-[30%]">時間</th>
                      <th className="py-2 px-3 text-left w-[40%]">商品数</th>
                      <th className="py-2 px-3 text-right w-[30%]">合計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .slice()
                      .reverse()
                      .slice(0, 5)
                      .map((tx) => {
                        const itemCount = tx.items.reduce(
                          (s, i) => s + i.quantity,
                          0
                        );
                        const time = new Date(tx.createdAt).toLocaleTimeString(
                          "ja-JP",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        );
                        return (
                          <tr
                            key={tx.id}
                            className="border-b last:border-b-0 hover:bg-gray-50"
                          >
                            <td className="py-2 px-3">{time}</td>
                            <td className="py-2 px-3">
                              {itemCount}個 / {tx.items.length}商品
                            </td>
                            <td className="py-2 px-3 text-right">
                              {tx.total.toLocaleString()}円
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;