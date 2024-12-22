import React from "react";
import SearchBar from "../searchBar/SearchBar.jsx";

const SearchSection = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default SearchSection;
