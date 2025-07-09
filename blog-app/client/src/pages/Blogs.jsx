import { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { StoreContext } from "../context/StoreContext";
import { ClipLoader } from "react-spinners";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // Trigger loading state when blogData changes
  useEffect(() => {
    if (blogData.length > 0) {
      setLoading(false);
    }
  }, [blogData]);

  // Sort blogs by newest date first
  const sortedBlogs = [...blogData].sort(
    (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
  );

  return (
    <div>
      <Hero />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 mt-6">
        All Blogs
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Discover insightful articles, tips, and stories crafted to inspire,
        inform, and keep you updated with the latest trends. Dive in and explore
        what’s new!
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <ClipLoader size={50} color="#F97316" />
        </div>
      ) : (
        <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
          {sortedBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              id={blog._id || blog.id}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              author_name={blog.author.name}
              author_image={blog.author.image}
              date={blog.createdAt || blog.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
