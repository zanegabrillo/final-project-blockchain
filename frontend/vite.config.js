import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards /api/* to the Express backend so the frontend can call
      // fetch("/api/...") without hardcoding a host or dealing with CORS
      // during development.
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});