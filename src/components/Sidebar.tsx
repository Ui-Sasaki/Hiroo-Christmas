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
