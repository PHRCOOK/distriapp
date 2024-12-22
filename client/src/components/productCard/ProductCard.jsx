import React from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductBuyButton from "./ProductBuyButton";

const ProductCard = ({ product, handleProductClick, handleBuyClick }) => {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 shadow-sm d-flex flex-column"
        onClick={() => handleProductClick(product.id)}
        style={{ cursor: "pointer", marginTop: "20px", bottom: "20px" }}
      >
        <ProductImage image={product.image} alt={product.name} />
        <div className="card-body d-flex flex-column">
          <ProductDetails product={product} />
          <ProductBuyButton product={product} handleBuyClick={handleBuyClick} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
