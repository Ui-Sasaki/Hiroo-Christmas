"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Sidebar from "../../components/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

export default function Analytics() {
  // 1) state hooks – these must always be in the same order
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "staff" | null>(null);

  // 2) read role from localStorage after mount
  useEffect(() => {
    const role = (typeof window !== "undefined"
      ? (localStorage.getItem("userRole") as "admin" | "staff" | null)
      : null) ?? "staff";

    setUserRole(role);
  }, []);

  // 3) fetch transactions once role is known (only for admin)
  useEffect(() => {
    if (!userRole) return;
    if (userRole !== "admin") {
      setLoading(false);
      return;
    }

    const fetchTx = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("売上データの取得に失敗しました。");

        const json = await res.json();
        setTransactions(json.transactions ?? []);
      } catch (e: any) {
        console.error(e);
        setError(e.message ?? "売上データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchTx();
  }, [userRole]);

  // 4) summary info
  const { totalAmount, txCount, totalQty, productSummary, bestProduct, maxAmount } =
    useMemo(() => {
      let amount = 0;
      let qty = 0;
      const map = new Map<
        number,
        { productId: number; name: string; totalQty: number; totalAmount: number }
      >();

      for (const tx of transactions) {
        amount += tx.total;
        for (const item of tx.items) {
          qty += item.quantity;
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

      const arr = Array.from(map.values()).sort(
        (a, b) => b.totalAmount - a.totalAmount
      );
      const best = arr[0];
      const max = arr.reduce((m, p) => Math.max(m, p.totalAmount), 0);

      return {
        totalAmount: amount,
        txCount: transactions.length,
        totalQty: qty,
        productSummary: arr,
        bestProduct: best,
        maxAmount: max,
      };
    }, [transactions]);

  // 5) hourly curve data
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

  // 6) render
  return (
    <div className="flex">
      <Sidebar activePage="統計・分析" />
      <div className="p-10 w-full">
        <h1 className="text-2xl font-bold mb-6">統計・分析</h1>

        {/* ロール判定 */}
        {userRole === null && (
          <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
            ロール情報を読み込み中…
          </div>
        )}

        {userRole === "staff" && (
          <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
            このページは管理者のみ閲覧できます。
          </div>
        )}

        {/* ローディング & エラー */}
        {userRole === "admin" && (
          <>
            {loading && (
              <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500 mb-4">
                売上データを読み込み中…
              </div>
            )}

            {error && !loading && (
              <div className="bg-white rounded-lg shadow p-10 text-center text-red-500 mb-4">
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
                {/* サマリーカード */}
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
                        <span className="font-semibold">
                          {bestProduct.name}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 時間帯カーブ */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    12:30〜17:00 の時間帯別 販売個数カーブ
                  </h2>
                  <Line data={lineData} options={lineOptions} />
                </div>

                {/* 商品別ランキング */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold mb-4">
                    商品別 売上ランキング
                  </h2>
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
                                {p.totalQty}個 /{" "}
                                {p.totalAmount.toLocaleString()}円
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}