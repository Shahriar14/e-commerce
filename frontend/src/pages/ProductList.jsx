import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Newsletter from "../components/NewsLetter";
import { useLocation } from "react-router";
import { useState } from "react";

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2]; // Extract category from URL

    const [filters, setFilters] = useState({}); // State for filter criteria
    const [sort, setSort] = useState("newest"); // State for sorting method

    // Handle filter changes
    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value, // Update filters state
        });
    };

    return (
        <div className="bg-white"> {/* Main container */}
            <Navbar />
            <Announcement />
            <h1 className="text-3xl font-extrabold m-5">{cat}</h1> {/* Category title */}
            <div className="flex justify-between m-5"> {/* Filter container */}
                {/* Filter Section */}
                <div className="m-5 flex flex-col md:flex-row">
                    <span className="text-lg font-semibold mr-5">Filter Products:</span> {/* Filter text */}
                    <select name='color' onChange={handleFilters} className="p-2 border border-gray-400 rounded-md">
                        <option disabled selected>Brand</option> {/* Default option */}
                        <option>lenovo</option>
                        <option>iPhone</option>
                        <option>boat</option>
                        <option>Blue</option>
                        <option>Yellow</option>
                        <option>Green</option>
                    </select>
                </div>
                {/* Sort Section */}
                <div className="m-5 flex flex-col md:flex-row">
                    <span className="text-lg font-semibold mr-5">Sort Products:</span> {/* Sort text */}
                    <select onChange={(e) => setSort(e.target.value)} className="p-2 border border-gray-400 rounded-md">
                        <option value="newest">Newest</option> {/* Sorting options */}
                        <option value='asc'>Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </div>
            </div>
            <Products cat={cat} filters={filters} sort={sort} /> {/* Products component */}
            <Newsletter />
            <Footer />
        </div>
    );
};

export default ProductList;
