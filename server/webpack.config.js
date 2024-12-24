const path = require("path");

module.exports = {
  // Punto de entrada
  entry: "./index.js", // Asegúrate de que este archivo existe

  // Carpeta de salida
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // Modo de desarrollo
  mode: "development",

  // Cargar y compilar JS con Babel
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica para todos los archivos .js
        exclude: /node_modules/, // No incluir la carpeta node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // Configuración del servidor de desarrollo (opcional)
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
