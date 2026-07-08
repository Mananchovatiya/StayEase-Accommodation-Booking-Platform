import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The proxy forwards /api requests to the Express backend (port 8080),
// so the session cookie works without any CORS trouble in development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
