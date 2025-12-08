import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import groupImg from "../assets/group.png";
import {
  FaBoxOpen,
  FaChartBar,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ activePage = "売上管理" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();


  const navClass = (page: string) =>
    `px-4 py-2 rounded cursor-pointer transition flex items-center gap-2 text-lg ${
      activePage === page
        ? "bg-white text-black font-semibold"
        : "hover:bg-white hover:text-green-600"
    }`;

  return (
    <div
      className="relative flex flex-col text-white transition-all duration-300 shadow-md"
      style={{
        backgroundColor: "#3F861E",
        width: collapsed ? "80px" : "360px",
        height: "100vh",
        padding: collapsed ? "10px" : "24px",
      }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute bottom-1/4 -right-6 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition"
      >
        {collapsed ? (
          <FaChevronRight className="text-[#3F861E] text-2xl" />
        ) : (
          <FaChevronLeft className="text-[#3F861E] text-2xl" />
        )}
      </button>

      {/* Profile (hidden when collapsed) */}
      {!collapsed && (
        <>
          <div className="h-10" />
          <div className="flex items-center gap-4 mb-8">
            <img
              src={groupImg}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="text-2xl font-bold">富岡 栄莉英</div>
              <div className="text-sm text-green-100">管理者</div>
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <nav className={`space-y-4 ${collapsed ? "mt-16" : "mt-2"}`}>
        {!collapsed ? (
          <>
            <div className={navClass("部門員権限")}>部門員権限</div>
            <div className={navClass("商品販売")}>
              <FaBoxOpen className="text-base" />
              <span>商品販売</span>
            </div>
            <div className={navClass("売上管理")}>
              <FaChartBar className="text-base" />
              <span>売上管理</span>
            </div>
          </>
        ) : (
          <>
            <FaBoxOpen className="text-3xl mx-auto cursor-pointer hover:text-gray-200" />
            <FaChartBar className="text-3xl mx-auto cursor-pointer hover:text-gray-200" />
          </>
        )}
      </nav>

      {/* LOGOUT AT BOTTOM ALWAYS */}
      <div className="mt-auto pb-6">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 transition"
        >
          <FaSignOutAlt className="text-xl" />
          {!collapsed && <span>ログアウト</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;