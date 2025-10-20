import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    // Drop dev-only statements and compress output
    minify: "esbuild",
    sourcemap: false,
    // Use esbuild to drop console/debugger only in production builds
    // (Vite passes this directly to esbuild)
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
      legalComments: "none",
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/[\\/]node_modules[\\/]recharts[\\/]/.test(id)) return "chart-vendor";
          if (/[\\/]node_modules[\\/]react-markdown[\\/]/.test(id)) return "markdown-vendor";
          if (/[\\/]node_modules[\\/]@tanstack[\\/]react-query[\\/]/.test(id)) return "query-vendor";
          if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) return "icons-vendor";
          if (/[\\/]node_modules[\\/](embla-carousel|embla-carousel-react|embla-carousel-autoplay)[\\/]/.test(id)) return "carousel-vendor";
          if (/[\\/]node_modules[\\/](react-hook-form|@hookform[\\/]resolvers|zod)[\\/]/.test(id)) return "forms-vendor";
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return "anim-vendor";
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/.test(id)) return "react-vendor";
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
