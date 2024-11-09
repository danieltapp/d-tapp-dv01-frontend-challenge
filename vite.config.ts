import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), Inspect(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/recharts")) {
            return "recharts";
          }
        },
      },
    },
  },
});
