import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import ClipLoader from "react-spinners/ClipLoader";

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

  return (
    <div className="rounded-md border-3 shadow-md border-gray-200 p-5 max-w-3xl flex flex-col gap-3 items-center justify-center my-4 mx-auto py-8">
      <img
        className="transition-transform duration-300 w-100 cursor-pointer rounded hover:scale-105"
        src={`http://localhost:4000/images/${blog.image}`}
        alt=""
      />
      <p className="text-2cl font-bold">{blog.title}</p>
      <p className="text-[#4B6BFB]">{blog.category}</p>
      <p>{blog.description}</p>
      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg font-bold">Author: {blog.author.name}</p>
        <img
          className="w-8 h-8 rounded-full"
          src={`https://shiera-backend-14.onrender.com/images/${blog.author.image}`}
          alt=""
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
