import { TiShoppingCart } from "react-icons/ti";
import { FcSearch } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import React, { useState } from "react"; // Import useState
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); // Navigate to search page with query
      setSearchQuery(""); // Optional: clear search input
    }
  };

  return (
    <div className="h-16 md:h-20 shadow-md">
      <div className="flex items-center justify-between p-4 md:px-8">

        {/* Logo in the center */}
        <div className="flex-1 text-center">
          <Link to="/" className="text-2xl md:text-4xl font-bold">
            Ecom
          </Link>
        </div>

        {/* Search container on the left */}
        <div className="hidden md:flex flex-1 items-center">
          <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md ml-4 p-2 w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border-none w-full text-sm"
            />
            <button type="submit">
              <FcSearch className="text-gray-500 text-lg ml-2" />
            </button>
          </form>
        </div>

        {/* Right side (Menu and Cart) */}
        <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-8">
          <Link
            to="/register"
            className="text-sm cursor-pointer hidden md:block transition-transform duration-200 hover:scale-110 hover:font-bold"
          >
            REGISTER
          </Link>
          <Link
            to="/login"
            className="text-sm cursor-pointer hidden md:block transition-transform duration-200 hover:scale-110 hover:font-bold"
          >
            SIGN IN
          </Link>

          <Link to="/cart">
            <div className="relative cursor-pointer text-sm cursor-pointer hidden md:block transition-transform duration-200 hover:scale-110 hover:font-bold">
              <Badge badgeContent={quantity} color="primary">
                <TiShoppingCart className="text-2xl" />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;




