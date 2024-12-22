import React from "react";

const ProductImage = ({ image, alt }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      }}
    >
      <img
        src={image}
        alt={alt}
        className="card-img-top"
        style={{
          height: "200px",
          width: "200px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default ProductImage;
