import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logoutUser } = useContext(StoreContext);

  const handleLogout = () => {
    logoutUser(); // your existing logout logic
    toast.success("Logout successfully");
  };

  return (
    <nav className="bg-white z-50 sticky top-0">
      <div className="flex container shadow-md  py-5 px-5 pb-3 justify-between items-center">
        {/* logo */}
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={assets.logo} alt="" />
          </Link>
          <span style={{fontSize : "30px",fontStyle : "italic"}} className="font-bold text-2xl">log</span>
        </div>

        {/* center content */}
        <ul className="hidden sm:flex gap-5 text-xl font-normal justify-center items-center text-gray-700">
          <Link
            to="/"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            About
          </Link>
        </ul>

        {user ? (
          <div className="flex gap-2">
            <Link
              to={"/dashboard"}
              className="bg-black px-6 py-2 rounded-full text-white"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-orange-600 duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="bg-orange-500 text-white px-8 py-2 rounded-full cursor-pointer hover:bg-orange-600 duration-300"
          >
            Signin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
