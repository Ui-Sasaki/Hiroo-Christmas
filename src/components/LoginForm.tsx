import React from 'react';

const LoginForm = () => {
     return (
          <div className="w-full max-w-xl">
               <h1 className="text-5xl font-bold text-green-700 mb-2">ログイン</h1>
               <p className="text-gray-400 mb-10 text-lg">Login to your account.</p>

               {/* Email Field */}
               <label className="block text-sm font-semibold text-green-700 mb-1">
                    E-mail Address
               </label>
               <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
                    placeholder="you@hiroogakuen.com"
               />

               {/* Password Field */}
               <label className="block text-sm font-semibold text-green-700 mb-1">
                    Password
               </label>
               <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-4 py-3 mb-20 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
                    placeholder="●●●●●●●●"
               />

               {/* Sign In Button */}
               <button className="w-full bg-green-700 text-white rounded px-4 py-3 text-lg hover:bg-green-800 transition">
                    サインイン
               </button>

               {/* Help Text */}
               <p className="text-xs text-gray-500 mt-4">
                    パスワードを忘れた場合は広報部門までご連絡ください
               </p>
          </div>
     );
};

export default LoginForm;
