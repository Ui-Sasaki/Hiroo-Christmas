import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "広尾クリスマス販売システム",
  description: "Hiroo Gakuen Christmas Sales Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased bg-[#E3EDF9]">{children}</body>
    </html>
  );
}