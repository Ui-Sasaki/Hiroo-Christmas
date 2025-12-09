import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaChartBar,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaStar
} from "react-icons/fa";
import groupImg from "../assets/Group.png";

type PageName = "部門員権限" | "商品販売" | "売上管理" | "統計・分析";

interface SidebarProps {
  activePage?: PageName;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage = "売上管理" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole") || "staff";

  const navClass = (page: PageName) =>
    `px-4 py-2 rounded cursor-pointer transition flex items-center gap-2 text-lg ${
      activePage === page
        ? "bg-white text-black font-semibold"
        : "hover:bg-white hover:text-green-600 text-green-100"
    }`;

  const adminNavClass = (page: PageName) =>
    `px-4 py-2 rounded cursor-pointer transition flex items-center gap-2 text-lg border-2 ${
      activePage === page
        ? "bg-yellow-300 border-yellow-500 text-black font-semibold"
        : "border-yellow-500 text-yellow-200 hover:bg-yellow-300 hover:text-black"
    }`;

  return (
    <div
      className="relative shadow-md flex flex-col justify-between text-white transition-all duration-300"
      style={{
        backgroundColor: "#3F861E",
        width: collapsed ? "80px" : "360px",
        height: "100vh",
        padding: collapsed ? "10px" : "24px",
      }}
    >
      {/* 折りたたみボタン */}
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

      {/* 上部分 */}
      <div>
        {!collapsed && (
          <div>
            <div className="h-10" />
            <div className="flex items-center gap-4 mb-8">
              <img
                src={groupImg}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <div className="text-2xl font-bold">広尾-技術</div>
                <div className="text-sm text-green-100">
                  {userRole === "admin" ? "技術部門" : "スタッフ"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ナビゲーション */}
        <nav className={`${collapsed ? "mt-10" : ""} space-y-4`}>

          {/* 商品販売 */}
          {!collapsed ? (
            <div className={navClass("商品販売")} onClick={() => navigate("/sales")}>
              <FaBoxOpen className="text-base" />
              <span>商品販売</span>
            </div>
          ) : (
            <FaBoxOpen
              className="text-3xl mx-auto cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/sales")}
            />
          )}

          {/* 売上管理 */}
          {!collapsed ? (
            <div className={navClass("売上管理")} onClick={() => navigate("/")}>
              <FaChartBar className="text-base" />
              <span>売上管理</span>
            </div>
          ) : (
            <FaChartBar
              className="text-3xl mx-auto cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/")}
            />
          )}

          {/* ⭐統計・分析（管理者のみ） */}
          {userRole === "admin" &&
            (!collapsed ? (
              <div
                className={adminNavClass("統計・分析")}
                onClick={() => navigate("/analytics")}
              >
                <FaStar className="text-base" />
                <span>統計・分析</span>
              </div>
            ) : (
              <FaStar
                className={`text-3xl mx-auto cursor-pointer ${
                  activePage === "統計・分析" ? "text-yellow-300" : "text-yellow-200"
                } hover:text-yellow-300`}
                onClick={() => navigate("/analytics")}
              />
            ))}
        </nav>
      </div>

      {/* ログアウト */}
      <div className="mb-6">
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