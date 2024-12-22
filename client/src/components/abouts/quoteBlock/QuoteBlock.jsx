import React from "react";

const QuoteBlock = ({ text }) => (
  <blockquote className="blockquote mt-4 border-start border-5 border-success ps-3">
    <p className="mb-0">{text}</p>
  </blockquote>
);

export default QuoteBlock;
