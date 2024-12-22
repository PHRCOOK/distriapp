import React from "react";
import ProductImage from "./ProductImage";

const ProductGrid = ({ images }) => (
  <div className="d-flex flex-wrap justify-content-center mt-5 pt-5">
    {images.map((imageUrl, index) => (
      <ProductImage key={index} imageUrl={imageUrl} index={index} />
    ))}
  </div>
);

export default ProductGrid;
