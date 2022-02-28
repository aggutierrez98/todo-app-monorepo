import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  plugins: [react()],
  root: path.join(__dirname, "src"),
  build: {
    outDir: path.join(__dirname, "build"),
  },
  input: "src/index.js",
  output: {
    dir: "output",
    format: "esm",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@p": path.resolve(__dirname, "./src/pages"),
      "@c": path.resolve(__dirname, "./src/components"),
      "@a": path.resolve(__dirname, "./src/assets"),
      "@h": path.resolve(__dirname, "./src/hooks"),
    },
  },
  // server: {
  //   open: true,
  // },
});
