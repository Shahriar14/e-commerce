import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="flex m-3 h-[70vh] relative group">
      <Link to={`/products/${item.cat}`} className="w-full h-full">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={item.img}
          alt={item.title} // Added alt text for accessibility
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
          <h1 className="text-4xl font-extrabold text-white mb-4 text-shadow-md">{item.title}</h1>
          <button className="border-2 border-gray-300 p-2.5 bg-white text-gray-500 cursor-pointer font-bold rounded-lg transition-colors duration-300 hover:bg-gray-500 hover:text-white hover:border-transparent">
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
