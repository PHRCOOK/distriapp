import React from "react";
import { useProducts } from "./ProductsContext";

const Products = () => {
  const { products } = useProducts();

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="100" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
