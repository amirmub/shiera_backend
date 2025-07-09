import { useContext, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";

const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate loading or set it based on actual data availability
  useEffect(() => {
    if (blogData.length > 0) {
      setLoading(false);
    }
  }, [blogData]);

  // Sort by newest first
  const sortedBlogs = [...blogData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Filter logic
  const filteredBlogs = sortedBlogs.filter((blog) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      blog.title.toLowerCase().includes(lowerSearch) ||
      blog.category.toLowerCase().includes(lowerSearch) ||
      blog.author.name.toLowerCase().includes(lowerSearch) ||
      new Date(blog.createdAt).toISOString().slice(0, 10).includes(lowerSearch)
    );
  });

  return (
    <div>
      {/* Search Box with Right Icon */}
      <div className="flex justify-center mb-6 px-3 sm:px-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full sm:w-1/2 pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="absolute right-[calc(25%+1rem)] sm:right-[calc(25%+1rem)] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
        >
          <FiSearch size={20} />
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-3xl my-3 mb-7 text-center text-gray-700 font-bold">
        Latest Blogs
      </h1>

      {/* Loader or Blog List */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <ClipLoader size={50} color="#F97316" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.slice(0, 6).map((blog, index) => (
              <BlogCard
                key={index}
                id={blog._id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                author_name={blog.author.name}
                author_image={blog.author.image}
                date={blog.createdAt}
              />
            ))
          ) : (
            <p className="text-center text-2xl mb-44 col-span-3">
              No blogs match your search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
