import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import SearchSection from "./SearchSection.jsx";
import ProductCardsSection from "./ProductCardSection.jsx";
import PaginationSection from "./PaginationSection.jsx";
import Order from "../order/Order.jsx";
import axios from "axios";
import { useUser } from "../../context/UserContext.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { userType } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleBuyClick = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      try {
        // Reducir el stock localmente en el estado
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, stock: p.stock - 1 } : p
          )
        );

        // Enviar la actualización al servidor
        await axios.put(`/productos/${productId}`, {
          stock: product.stock - 1,
        });

        // Agregar el producto al carrito
        addToCart(product);
      } catch (error) {
        console.error(
          "Error actualizando el stock en la base de datos:",
          error
        );
        alert("Error al comprar el producto. Intente de nuevo.");
      }
    } else {
      alert("No hay stock disponible para este producto.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCreateProductClick = () => {
    navigate("/crearproducto");
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Lista de Productos</h2>
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {userType === "admin" && (
          <button
            className="btn btn-primary btn-sm mb-4"
            onClick={handleCreateProductClick}
          >
            Crear Producto
          </button>
        )}

        <div className="row">
          <div className="col-md-3 mb-4">
            <Order products={products} setProducts={setProducts} />
          </div>
          <ProductCardsSection
            currentProducts={currentProducts}
            handleProductClick={handleProductClick}
            handleBuyClick={handleBuyClick}
          />

          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      <footer
        className="text-center mt-4 py-3"
        style={{ marginTop: "20px" }}
      ></footer>
    </div>
  );
};

export default ProductList;
