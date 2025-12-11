"use client";

import React from "react";
import Sidebar from "../../frontend/components/Sidebar";
import Header from "../../frontend/components/Header";
import Sales from "../../frontend/pages/sales/Sales";

export default function SalesRoute() {
  return (
    <div className="flex h-screen bg-[#E3EDF9]">
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
}