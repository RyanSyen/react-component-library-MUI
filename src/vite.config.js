/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  base: "",
  root: "",
  build: {
    // outDir: path.join(__dirname, "test"),
    outDir: "../test",
  },
});
