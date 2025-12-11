"use client";

import React from "react";
import Sidebar from "../frontend/components/Sidebar";
import Header from "../frontend/components/Header";
import TransactionTable from "../frontend/components/TransactionTable";

export default function RootPage() {
  return (
    <div className="flex h-screen bg-[#E3EDF9]">
      <Sidebar activePage="売上管理" />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-6 py-3 shadow">
          <Header title="売上管理" />
        </div>
        <div className="p-6">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}