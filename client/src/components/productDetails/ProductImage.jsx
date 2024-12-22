import React from "react";

const ProductImage = ({ image, name }) => {
  return (
    <img
      src={image}
      alt={name}
      className="rounded-circle border border-3 border-secondary mb-3"
      style={{
        objectFit: "cover",
        height: "200px",
        width: "200px",
      }}
    />
  );
};

export default ProductImage;
