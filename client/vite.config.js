import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Usa './' para rutas relativas (útil para despliegues estáticos)
  build: {
    outDir: "dist", // El directorio donde Vite genera los archivos de producción
  },
});
