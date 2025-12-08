import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import groupImg from '../assets/group.png';
import {
  FaBoxOpen,
  FaChartBar,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 現在のページ（あとでルーティングと連動させてもOK）
  const activePage = "売上管理";

  const navigate = useNavigate();

  const menuItems = [
    { label: "部門員権限", icon: null, onClick: () => {} },
    { label: "商品販売", icon: <FaBoxOpen />, onClick: () => navigate("/sales") },
    { label: "売上管理", icon: <FaChartBar />, onClick: () => navigate("/manage") },
  ];

  return (
    <div
      className="
        relative shadow-md flex flex-col justify-between text-white
        transition-all duration-300 min-h-screen
      "
      style={{
        backgroundColor: '#3F861E',
        width: isCollapsed ? '64px' : '360px',
        padding: isCollapsed ? '0px' : '24px',
      }}
    >
          <button
  onClick={() => setIsCollapsed(!isCollapsed)}
  className="
    absolute top-[69%] -right-7  /* moved more left */
    -translate-y-1/2 w-16 h-16    /* bigger circle */
    rounded-full bg-white flex items-center justify-center
    shadow-lg cursor-pointer z-20 hover:scale-105 transition
  "
>
  {isCollapsed ? (
    <FaChevronRight className="text-[#3F861E] text-3xl" />
  ) : (
    <FaChevronLeft className="text-[#3F861E] text-3xl" />
  )}
</button>

      {!isCollapsed && (
        <>
          <div>
            <div className="h-20" />

            <div className="flex items-center gap-4 mb-6">
              <img
                src={groupImg}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex flex-col">
                <div className="text-2xl font-bold">富岡 栄莉英</div>
                <div className="text-sm text-green-100">管理者</div>
              </div>
            </div>

            <nav className="space-y-2 text-sm text-green-100">
              {menuItems.map(
                (item) => {
                const isActive = item.label === activePage;
                return (
                  <div
                    key={item.label}
                    onClick={item.onClick}
                    className={`
                      px-4 py-2 rounded cursor-pointer flex items-center gap-2 text-lg transition
                      ${
                        isActive
                          ? "bg-white text-black font-semibold"
                          : "hover:bg-white hover:text-green-600"
                      }
                    `}
                  >
                    {item.icon && <span className="text-base">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </div>

          <button
            className="
              w-full flex items-center justify-center gap-3
              bg-[#E6492D] text-white py-4 rounded-md text-lg font-semibold
              shadow-md hover:bg-[#cc3d25] transition mt-6
            "
          >
            <FaSignOutAlt className="text-2xl" />
            <span>ログアウト</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
