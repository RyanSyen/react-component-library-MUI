import react from "@vitejs/plugin-react";
// import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  root: "",
  build: {
    // outDir: path.join(__dirname, "test"),
    outDir: "../test",
  },
});
