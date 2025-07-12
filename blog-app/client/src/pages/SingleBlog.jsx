import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import ClipLoader from "react-spinners/ClipLoader";
import {BASE_URL} from "../utils/axios"; // Make sure BASE_URL is exported from this file

const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);

  const blog = blogData.find((b) => b._id === id);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#f97316" />
      </div>
    );
  }

  const finalImage = blog.image?.startsWith("http")
    ? blog.image
    : `${BASE_URL}/images/${blog.image}`;

  const finalAuthorImage = blog.author?.image?.startsWith("http")
    ? blog.author.image
    : `${BASE_URL}/images/${blog.author.image}`;

  return (
    <div className="rounded-md border-3 shadow-md border-gray-200 p-5 max-w-3xl flex flex-col gap-3 items-center  justify-center mt-5 mb-14 mx-auto py-8">
      <img
        className="transition-transform duration-300 w-150 h-75 object-cover cursor-pointer rounded hover:scale-105"
        src={finalImage}
        alt={blog.title}
        onError={(e) => (e.target.src = "/fallback-blog.jpg")}
      />

      <p className="text-2xl font-bold">{blog.title}</p>
      <p className="text-[#4B6BFB]">{blog.category}</p>
      <p>{blog.description}</p>

      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg font-bold">Author: {blog.author.name}</p>
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={finalAuthorImage}
          alt={blog.author.name}
          onError={(e) => (e.target.src = "/fallback-user.jpg")}
        />
      </div>

      <p>
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default SingleBlog;
