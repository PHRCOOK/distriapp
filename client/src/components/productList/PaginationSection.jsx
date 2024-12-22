import React from "react";
import Pagination from "../pagination/PaginationProd.jsx";

const PaginationSection = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="col-md-3 mb-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationSection;
