import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4 d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-50"
        placeholder="Buscar por nombre de producto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
