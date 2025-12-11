"use client";

import React from "react";
import Sidebar from "../../frontend/components/Sidebar";
import Header from "../../frontend/components/Header";
import Analytics from "../../frontend/pages/admin/Analytics"; // adjust if path differs

export default function AnalyticsRoute() {
  return (
    <div className="flex h-screen bg-[#E3EDF9]">
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
}