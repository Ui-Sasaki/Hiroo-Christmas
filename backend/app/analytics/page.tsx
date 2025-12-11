// backend/app/analytics/page.tsx
"use client";

import React from "react";
import Sidebar from "../../frontend/components/Sidebar";
import Analytics from "../../frontend/pages/admin/Analytics";

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen">
      {/* ✅ ここだけサイドバー */}
      <Sidebar activePage="統計・分析" />

      {/* ✅ 中身はさっきのシンプルな Analytics だけ */}
      <main className="flex-1 overflow-y-auto">
        <Analytics />
      </main>
    </div>
  );
}