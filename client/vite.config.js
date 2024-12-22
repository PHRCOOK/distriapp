import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Asegura rutas relativas si es necesario
  build: {
    outDir: "dist", // Directorio de salida para los archivos generados
  },
});
