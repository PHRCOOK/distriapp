import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import ProductList from "./components/productList/ProductList";
import Navbar from "./components/navBar/Navbar";
import Footer from "./components/footer/Footer";
import About from "./components/abouts/Abouts";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./components/cart/Cart";
import History from "./components/orderHistory/OrderHistory";
import CrearProducto from "./components/productList/ProductosCrud";
import Clientes from "./components/adminDashboard/Clientes.jsx";
import List from "./components/orderHistory/OrderList.jsx";
import Flete from "./components/FleteDashboad/Flete.jsx";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { UserProvider } from "./context/UserContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = "https://xbrxnbbwoctabpjhgqya.supabase.co/";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <ProductsProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/about" element={<About />} />
              <Route path="/detail/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/history" element={<History />} />
              <Route path="/crearproducto" element={<CrearProducto />} />{" "}
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/list" element={<List />} />
              <Route path="/flete" element={<Flete />} />
            </Routes>
            <Footer />
          </Router>
        </ProductsProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
