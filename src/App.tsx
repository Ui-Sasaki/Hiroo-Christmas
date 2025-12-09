// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TransactionTable from "./components/TransactionTable";
import LoginPage from "./pages/LoginPage";
import Sales from "./pages/sales/Sales";
import Analytics from "./pages/admin/Analytics";

// 売上管理レイアウト
const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#E3EDF9" }}>
      <Sidebar activePage="売上管理" />

      <div className="flex-1 overflow-y-auto">
        {/* 上のヘッダー */}
        <div className="bg-white px-6 py-3 shadow">
          <Header title="売上管理" />
        </div>

        {/* 中身 */}
        <div className="p-6">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

// 商品販売レイアウト
const SalesLayout: React.FC = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#E3EDF9" }}>
      <Sidebar activePage="商品販売" />

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-6 py-3 shadow">
          <Header title="商品販売" />
        </div>

        <div className="p-6">
          <Sales />
        </div>
      </div>
    </div>
  );
};

const AdminAnalyticsLayout: React.FC = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#E3EDF9" }}>
      <Sidebar activePage="統計・分析" />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-6 py-3 shadow">
          <Header title="統計・分析" />
        </div>
        <div className="p-6">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardLayout />} />
      <Route path="/sales" element={<SalesLayout />} />
      <Route path="/analytics" element={<AdminAnalyticsLayout />} />
    </Routes>
  );
};

export default App;