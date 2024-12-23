import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Esto es importante para asegurar que las rutas de recursos se resuelvan correctamente
  build: {
    outDir: "dist", // Carpeta donde se generan los archivos de producción
  },
});
