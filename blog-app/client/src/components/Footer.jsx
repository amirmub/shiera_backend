import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer style={{background : "#1565C0"}} className="bg-blue-800  text-gray-200 px-2 md:px-16 pt-8 pb-5">
      <div className="max-w-7xl mx-auto pt-4 pl-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm md:text-base">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-200 mb-4">
            Blog is your trusted source for thought-provoking insights and updates on technology, lifestyle, and more.
          </p>
          <p>Email: <Link to="mailto:info@blog.com" className="text-orange-300 hover:underline">info@blog.com</Link></p>
          <p>Phone: <Link to="tel:+1234567890" className="text-orange-300 hover:underline">+251-9456 7890</Link></p>
        </div>

        {/* Quick Links */}
        <div className="pl-18">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-orange-300 transition">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-orange-300 transition">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-orange-300 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-orange-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-orange-300 transition">Technology</Link></li>
            <li><Link to="#" className="hover:text-orange-300 transition">Lifestyle</Link></li>
            <li><Link to="#" className="hover:text-orange-300 transition">News</Link></li>
            <li><Link to="#" className="hover:text-orange-300 transition">Weather</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-xl font-bold mb-4">Resources</h2>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-orange-300 transition">Help Center</Link></li>
            <li><Link to="#" className="hover:text-orange-300 transition">Documentation</Link></li>
            <li><Link to="#" className="hover:text-orange-300 transition">API Reference</Link></li>
            <li><Link to="#" className="hover:text-orange-300 transition">Community Forum</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" border-gray-700 pt-6 text-center text-sm text-gray-300">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Shiera_backend</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
