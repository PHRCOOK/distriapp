import React from "react";
import ProductCard from "../productCard/ProductCard.jsx";
import NoProductsFound from "./NoProductsFound.jsx";

const ProductCardsSection = ({
  currentProducts,
  handleProductClick,
  handleBuyClick,
}) => {
  return (
    <div className="col-md-9">
      <div className="row g-4">
        {currentProducts.length === 0 ? (
          <NoProductsFound />
        ) : (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductClick={handleProductClick}
              handleBuyClick={handleBuyClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCardsSection;
