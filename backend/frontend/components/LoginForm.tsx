// backend/frontend/components/LoginForm.tsx
"use client";

import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("LOGIN OK:", data);

        // ロール & メール保存（サイドバーとかで使う用）
        if (data.user) {
          localStorage.setItem("userRole", data.user.role ?? "staff");
          localStorage.setItem("userEmail", data.user.email ?? email);
        }

        // ✅ Next.js ではここで画面遷移
        if (typeof window !== "undefined") {
          window.location.href = "/sales"; // ログイン後は商品販売へ
        }
      } else if (res.status === 401) {
        setError("E-mail またはパスワードが違います。");
      } else {
        setError("サーバーエラーが発生しました。");
      }
    } catch (err) {
      console.error(err);
      setError("サーバーに接続できませんでした。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-xl" onSubmit={handleSubmit}>
      <h1 className="text-5xl font-bold text-green-700 mb-2">ログイン</h1>
      <p className="text-gray-400 mb-10 text-lg">Login to your account.</p>

      {error && (
        <div className="mb-6 rounded bg-red-100 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <label className="block text-sm font-semibold text-green-700 mb-1">
        E-mail Address
      </label>
      <input
        type="email"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
        placeholder="you@hiroogakuen.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block text-sm font-semibold text-green-700 mb-1">
        Password
      </label>
      <input
        type="password"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-green-700 text-white rounded px-4 py-3 text-lg hover:bg-green-800 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "サインイン中..." : "サインイン"}
      </button>

      <p className="text-xs text-gray-500 mt-4">
        パスワードを忘れた場合は広報部門までご連絡ください。
      </p>
    </form>
  );
};

export default LoginForm;