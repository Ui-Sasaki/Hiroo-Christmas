// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",     // ← important so your phone can reach 5173
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // backend (Next.js) on your PC
        changeOrigin: true,
      },
    },
  },
});