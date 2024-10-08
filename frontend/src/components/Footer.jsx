import { SiFacebook, SiGooglemaps } from "react-icons/si";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdOutlinePhoneForwarded, MdMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 text-white p-10">
      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-3xl font-bold">Ecom</h1>
        <p className="mt-4 mb-6">
          Discover the latest laptops, mobiles, and accessories. Our products
          are carefully selected to meet your needs and enhance your digital
          experience.
        </p>
        <div className="flex">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 mr-4">
              <SiFacebook />
            </div>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-700 mr-4">
              <FaLinkedin />
            </div>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 mr-4">
              <FaInstagram />
            </div>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-400 mr-4">
              <FaTwitter />
            </div>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900">
              <FaGithub />
            </div>
          </a>
        </div>
      </div>

      <div className="flex-1 p-4 hidden md:block">
        <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
        <ul className="list-none space-y-2">
          <li><a href="/" className="text-white hover:underline">Home</a></li>
          <li><a href="/cart" className="text-white hover:underline">Cart</a></li>
          <li><a href="/products/laptop" className="text-white hover:underline">Laptops</a></li>
          <li><a href="/products/fashion" className="text-white hover:underline">Mobiles</a></li>
          <li><a href="/products/accessories" className="text-white hover:underline">Accessories</a></li>
          <li><a href="/my-account" className="text-white hover:underline">My Account</a></li>
          <li><a href="/order/status" className="text-white hover:underline">Order Tracking</a></li>
          <li><a href="/terms" className="text-white hover:underline">Terms</a></li>
        </ul>
      </div>

      <div className="flex-1 p-4 bg-gray-700 md:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Contact</h3>
        <div className="flex items-center mb-4">
          <SiGooglemaps className="mr-2" /> 159, Ashkona Medical Road , Dhaka-1230
        </div>
        <div className="flex items-center mb-4">
          <MdOutlinePhoneForwarded className="mr-2" /> +880 01614074090
        </div>
        <div className="flex items-center mb-4">
          <MdMail className="mr-2" /> shahariarh037gmail.com
        </div>
        <img className="w-1/2 mt-4" src="" alt="Payment methods" />
      </div>
    </div>
  );
};

export default Footer;
