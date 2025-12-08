import React from 'react';

const transactions = [
  { time: '15:00:00', name: '商品B', qty: 1, subtotal: 200, total: '' },
  { time: '15:00:00', name: '商品K', qty: 1, subtotal: 200, total: '' },
  { time: '15:00:00', name: '商品I', qty: 1, subtotal: 200, total: 600 },
  { time: '15:02:59', name: '商品A', qty: 2, subtotal: 240, total: 240 },
  { time: '15:03:04', name: '商品A', qty: 1, subtotal: 120, total: '' },
  { time: '15:03:04', name: '商品A', qty: 3, subtotal: 600, total: 720 },
  { time: '15:05:03', name: '商品A', qty: 1, subtotal: 120, total: 120 },
];

const TransactionTable = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white rounded p-6">
      <h2 className="text-xl font-bold mb-4">12/23 決済履歴</h2>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-t border-gray-200 rounded overflow-hidden">
          <thead>
            <tr className="text-gray-600 bg-gray-100">
              <th className="py-3 px-2 text-sm">時間</th>
              <th className="px-2 text-sm">商品名</th>
              <th className="px-2 text-sm">個数</th>
              <th className="px-2 text-sm">小計</th>
              <th className="px-2 text-sm">合計</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                } h-16 align-middle`}
              >
                <td className="px-2">{t.time}</td>
                <td className="px-2">{t.name}</td>
                <td className="px-2">{t.qty}</td>
                <td className="px-2">{t.subtotal}</td>
                <td className="px-2">{t.total || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
