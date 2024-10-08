import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartRedux"; // Import the actions
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Initialize dispatch

  // Function to handle removing an item from the cart
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch the action with the product ID
  };

  // Function to handle increasing the quantity
  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId)); // Dispatch the action with the product ID
  };

  // Function to handle decreasing the quantity
  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(productId)); // Dispatch the action with the product ID
    }
    // Optionally, handle cases where quantity is 1 and decide if you want to remove the item
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="p-5">
        <h1 className="font-light text-center text-3xl mb-4">YOUR BAG</h1>
        <div className="flex items-center justify-between py-5">
          <button className="bg-transparent text-black font-semibold py-2 px-4 border border-black rounded hover:bg-black hover:text-white transition-colors duration-300">
            <Link to="/" className="text-inherit">
              CONTINUE SHOPPING
            </Link>
          </button>
          <div className="hidden md:flex">
            <span className="cursor-pointer underline mx-2">
              Shopping Bag ({cart.products.length})
            </span>
            <span className="cursor-pointer underline mx-2">Your Wishlist (0)</span>
          </div>
          <button className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300">
            CHECKOUT NOW
          </button>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex-1 pr-5">
            {cart.products.map((product) => (
              <div key={product._id} className="flex justify-between mb-4 border-b pb-4">
                <div className="flex">
                  <img src={product.img} className="w-32 object-cover rounded" alt={product.title} />
                  <div className="p-4 flex flex-col justify-between">
                    <span>
                      <b>Product:</b> {product.title}
                    </span>
                    <span>
                      <b>ID:</b> {product._id}
                    </span>
                    <div
                      className="w-5 h-5 rounded-full mt-2"
                      style={{ backgroundColor: product.color }}
                    />
                    {/* Remove button */}
                    <span>
                      <button
                        className="bg-red-500 text-white font-semibold py-1 px-3 mt-4 rounded hover:bg-red-600 transition-colors duration-300"
                        onClick={() => handleRemove(product._id)}
                      >
                        Remove
                      </button>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center mb-2">
                    {/* Increase quantity button */}
                    <button
                      onClick={() => handleIncrease(product._id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full p-2 shadow transition-transform transform hover:scale-110"
                      aria-label="Increase quantity"
                    >
                      <IoMdAdd className="text-xl" />
                    </button>
                    <span className="text-xl mx-4">{product.quantity}</span>
                    {/* Decrease quantity button */}
                    <button
                      onClick={() => handleDecrease(product._id, product.quantity)}
                      className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full p-2 shadow transition-transform transform hover:scale-110 ${product.quantity === 1 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      aria-label="Decrease quantity"
                      disabled={product.quantity === 1}
                    >
                      <IoMdRemove className="text-xl" />
                    </button>
                  </div>
                  <div className="text-2xl font-light">
                    $ {product.price * product.quantity}
                  </div>
                </div>
              </div>
            ))}
            <hr className="border-t border-gray-300 mb-4" />
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg p-5">
            <h1 className="font-light text-xl mb-4">ORDER SUMMARY</h1>
            <div className="flex justify-between my-2">
              <span>Subtotal</span>
              <span>$ {cart.total}</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Estimated Shipping</span>
              <span>$ 5.90</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Shipping Discount</span>
              <span>$ -5.90</span>
            </div>
            <div className="flex justify-between font-medium text-xl my-4">
              <span>Total</span>
              <span>$ {cart.total}</span>
            </div>
            <button className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition-colors duration-300">
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
