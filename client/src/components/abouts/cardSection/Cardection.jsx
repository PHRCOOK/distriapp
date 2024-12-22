import React from "react";

const CardSection = ({ imgSrc, imgAlt, title, children }) => (
  <div className="card shadow-lg border-light">
    <img src={imgSrc} className="card-img-top" alt={imgAlt} />
    <div className="card-body">
      <h2 className="card-title text-success mb-3">{title}</h2>
      {children}
    </div>
  </div>
);

export default CardSection;
