// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TransactionTable from "./components/TransactionTable";
import LoginPage from "./pages/LoginPage";
import Sales from "./pages/sales/Sales";
import Analytics from "./pages/admin/Analytics"; // if you have this

// simple helper
const isLoggedIn = () => !!localStorage.getItem("userRole");

// 売上管理レイアウト
const DashboardLayout: React.FC = () => (
  <div className="flex h-screen" style={{ backgroundColor: "#E3EDF9" }}>
    <Sidebar activePage="売上管理" />
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white px-6 py-3 shadow">
        <Header />
      </div>
      <div className="p-6">
        <TransactionTable />
      </div>
    </div>
  </div>
);

// 商品販売レイアウト
const SalesLayout: React.FC = () => (
  <div className="flex h-screen" style={{ backgroundColor: "#E3EDF9" }}>
    <Sidebar activePage="商品販売" />
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white px-6 py-3 shadow">
        <Header />
      </div>
      <div className="p-6">
        <Sales />
      </div>
    </div>
  </div>
);

// 統計・分析レイアウト（admin用）
const AnalyticsLayout: React.FC = () => (
  <div className="flex h-screen" style={{ backgroundColor: "#E3EDF9" }}>
    <Sidebar activePage="統計・分析" />
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white px-6 py-3 shadow">
        <Header />
      </div>
      <div className="p-6">
        <Analytics />
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      {/* ログインページ */}
      <Route path="/login" element={<LoginPage />} />

      {/* 保護されたルート（ログインしていなかったら /login に飛ばす） */}
      <Route
        path="/"
        element={
          isLoggedIn() ? <DashboardLayout /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/sales"
        element={
          isLoggedIn() ? <SalesLayout /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/analytics"
        element={
          isLoggedIn() ? (
            <AnalyticsLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* なんか変なURL → ログインへ */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;