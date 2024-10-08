// src/components/Products.js

import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addProduct } from "../redux/cartRedux"; // Import addProduct action (ensure the path is correct)
import PropTypes from 'prop-types'; // Optional: For prop type checking

const Products = ({ cat, filters, sort, search, isSearchPage }) => { // Accept 'isSearchPage' as an additional prop
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch(); // Initialize dispatch

    // Fetch products from the backend API based on category
    useEffect(() => {
        const getProducts = async () => {
            try {
                let url = cat
                    ? `http://localhost:5000/api/products?category=${cat}`
                    : "http://localhost:5000/api/products";

                const res = await axios.get(url);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        getProducts();
    }, [cat]);

    // Filter products based on category, filters, and search term
    useEffect(() => {
        let tempProducts = products;

        // Apply category and other filters if 'cat' and 'filters' are provided
        if (cat && filters) {
            tempProducts = products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            );
        }

        // Apply search filter if 'search' prop is provided
        if (search) {
            tempProducts = tempProducts.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredProducts(tempProducts);
    }, [products, cat, filters, search]);

    // Sort products based on the 'sort' prop
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else if (sort === "desc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    // Function to handle adding product to the cart
    const handleAddToCart = (product) => {
        dispatch(addProduct({ ...product, quantity: 1 })); // Dispatch addProduct action with product details and initial quantity of 1
    };

    return (
        <div className="p-5 flex flex-wrap ">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                    <div
                        key={item._id} // Ensure '_id' is used as the unique key
                        className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                    >
                        {/* Image Hover Effect */}
                        <div className="transition-transform duration-300 transform hover:scale-105">
                            <Product item={item} />
                        </div>
                        {/* Add to Cart Button */}
                        {/* Disable button if on search page */}
                        <button
                            onClick={() => !isSearchPage && handleAddToCart(item)} // Handle add to cart only if not on search page
                            className={`absolute left-1/2 transform -translate-x-1/2 bottom-4 bg-black text-white font-bold py-2 px-4 rounded transition-transform duration-300 hover:scale-105 hover:font-extrabold ${isSearchPage ? 'opacity-50 cursor-not-allowed' : ''}`} // Style for disabled button
                            hidden={isSearchPage} // Disable button if on search page
                        >
                            ADD TO CART
                        </button>
                    </div>
                ))
            ) : (
                // Display a message when no products match the search criteria
                <p className="w-full text-center text-gray-500">No products found for "{search}".</p>
            )}
        </div>
    );
};

// Optional: Define prop types for better type checking
Products.propTypes = {
    cat: PropTypes.string,
    filters: PropTypes.object,
    sort: PropTypes.string,
    search: PropTypes.string,
    isSearchPage: PropTypes.bool, // Add prop type for isSearchPage
};

export default Products;
