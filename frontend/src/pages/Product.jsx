import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { publicRequest } from "../requestMethods";
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/NewsLetter";

// Main Container
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract product ID from URL

  const [product, setProduct] = useState({}); // State for product details
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const [color, setColor] = useState(""); // State for selected color
  const dispatch = useDispatch(); // Initialize dispatch for Redux

  // Fetch product details from the server
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.error(err); // Log any error
      }
    };
    getProduct();
  }, [id]);

  // Handle quantity increment and decrement
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1); // Prevent quantity from going below 1
    } else {
      setQuantity(quantity + 1); // Increment quantity
    }
  };

  // Add product to cart
  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color }) // Dispatch product details with selected quantity and color
    );
  };

  return (
    <div className="bg-white">
      <Navbar />
      <Announcement />
      <div className="flex p-10 flex-col md:flex-row">
        {/* Image Container */}
        <div className="flex-1">
          <img src={product.img} alt={product.title} className="w-full h-[90vh] object-cover" />
        </div>
        {/* Info Container */}
        <div className="flex-1 p-5">
          <h1 className="text-4xl font-light">{product.title}</h1> {/* Product title */}
          <p className="my-4">{product.desc}</p> {/* Product description */}
          <span className="text-4xl font-semibold">${product.price}</span> {/* Product price */}
          {/* Filter Container */}
          {/* <div className="my-6 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg font-light">Color:</span>
              {product.color?.map((c) => (
                <div key={c} onClick={() => setColor(c)} className={`w-5 h-5 rounded-full mx-2 cursor-pointer`} style={{ backgroundColor: c }} />
              ))}
            </div>

          </div> */}
          {/* Add to Cart Section */}
          <div className="flex items-center mt-24">
            <div className="flex items-center">
              <IoMdRemove onClick={() => handleQuantity("dec")} className="fflex items-center justify-center w-12 h-12  bg-red-300 text-white rounded-full cursor-pointer transition-transform duration-200 transform hover:scale-110" />
              <span className="mx-2 text-2xl">{quantity}</span> {/* Display current quantity */}
              <IoMdAdd onClick={() => handleQuantity("inc")} className="flex items-center justify-center w-12 h-12  bg-green-300 text-white rounded-full cursor-pointer transition-transform duration-200 transform hover:scale-110" />
            </div>
            <button onClick={handleClick} className="p-2 text-xl mx-6 border-2 border-teal-500 bg-white text-teal-500 font-medium rounded-lg hover:bg-teal-500 hover:text-white transition-colors duration-300">
              ADD TO CART
            </button> {/* Add to Cart button */}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
