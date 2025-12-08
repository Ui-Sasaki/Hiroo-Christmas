<<<<<<< HEAD
import React, { useState } from 'react';
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

  const menuItems = [
    { label: "部門員権限", icon: null },
    { label: "商品販売", icon: <FaBoxOpen /> },
    { label: "売上管理", icon: <FaChartBar /> },
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
              {menuItems.map((item) => {
                const isActive = item.label === activePage;
                return (
                  <div
                    key={item.label}
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
=======
import React from 'react';
import groupImg from '../assets/group.png'; // Replace with actual image if needed
import { FaBoxOpen, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
     return (
          <div
               className="shadow-md p-6 flex flex-col justify-between text-white"
               style={{ backgroundColor: '#3F861E', width: '360px', height: '1118px' }}
          >
               <div>
                    {/* Spacer to push profile lower */}
                    <div className="h-20"></div>

                    {/* Profile section */}
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

                    {/* Navigation */}
                    <nav className="space-y-2 text-sm text-green-100">
                         <div className="px-4 py-2 rounded cursor-pointer transition flex items-center gap-2">
                              <span>部門員権限</span>
                         </div>
                         <div className="hover:bg-white hover:text-green-600 px-4 py-2 rounded cursor-pointer transition flex items-center gap-2 text-lg">
                              <FaBoxOpen className="text-base" />
                              <span>商品販売</span>
                         </div>
                         <div className="hover:bg-white hover:text-green-600 px-4 py-2 rounded cursor-pointer transition flex items-center gap-2 text-lg">
                              <FaChartBar className="text-base" />
                              <span>売上管理</span>
                         </div>
                    </nav>
               </div>

               {/* Logout */}
               <div className="mt-6">
                    <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                         <FaSignOutAlt className="text-white" />
                         <span>ログアウト</span>
                    </button>
               </div>
          </div>
     );
};

export default Sidebar;
>>>>>>> f3aac357753e5d37aa13c75bd9cb40cba2b57257
