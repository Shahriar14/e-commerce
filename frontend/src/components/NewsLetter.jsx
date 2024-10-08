import { MdSend } from "react-icons/md";

const Newsletter = () => {
  return (
    <div className="h-[60vh] bg-gradient-to-r from-[#add8e6] to-[#87ceeb] flex flex-col items-center justify-center text-center p-5">
      <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
        Newsletter
      </h1>
      <p className="text-xl font-light text-white mb-4">
        Get timely updates from your favorite products.
      </p>
      <div className="flex items-center w-1/2 md:w-2/5 h-10 bg-white border border-light-gray rounded-full overflow-hidden md:w-4/5">
        <input
          type="email"
          placeholder="Your email"
          className="flex-grow h-full pl-4 text-base border-none focus:outline-none focus:ring-2 focus:ring-[#ff7e5f] rounded-l-full"
        />
        <button className="flex items-center justify-center w-12 h-full bg-black text-white font-bold transition duration-300 hover:bg-black rounded-r-full">
          <MdSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
