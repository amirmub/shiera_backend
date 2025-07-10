import { Link } from "react-router-dom";
const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
  return (
    <div className="border-1 border-gray-300 shadow-md p-3 px-5 mb-8 mx-1 rounded-md">
      <Link to={`/blog/${id}`}>
        <img
          src={`https://shiera-backend-14.onrender.com/images/${image}`}
          alt=""
          className="flex rounded items-center justify-center w-100 h-58 z-0 mx-auto cursor-pointer transform duration-300 hover:scale-105"
        />
      </Link>
      <p className="text-[#4B6BFB] font-semibold my-3 ">{category}</p>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex gap-3 items-center my-3">
        <img
          className="w-8 h-8 rounded-full"
          src={`https://shiera-backend-14.onrender.com/images/${author_image}`}
          alt=""
        />
        <p className="text font-bold text-gray-600">{author_name}</p>
        <p className="text font-bold text-gray-600">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
export default BlogCard;
