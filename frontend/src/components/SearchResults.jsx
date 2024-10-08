// src/components/SearchResults.js
import React from "react";
import { useLocation } from "react-router-dom";
import Products from "./Products";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery();
    const searchTerm = query.get("q") || "";

    return (
        <div className="p-5">
            <h2 className="text-center text-2xl font-semibold my-4 ">Search Results for "{searchTerm}"</h2>
            {/* Pass isSearchPage={true} to Products */}
            <Products search={searchTerm} isSearchPage={true} />
        </div>
    );
};

export default SearchResults;
