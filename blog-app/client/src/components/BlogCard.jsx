import {BASE_URL} from "../utils/axios";
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
  // Construct full blog image URL
const cleanedImage = image?.trim();
const finalImage = cleanedImage?.startsWith("http")
  ? cleanedImage
  : `${BASE_URL.replace(/\/$/, "")}/images/${cleanedImage}`;

console.log("Final Blog Image URL:", finalImage);




  // Construct full author image URL
  const finalAuthorImage = author_image?.startsWith("http")
    ? author_image
    : `${BASE_URL}/images/${author_image}`;
    console.log("Final Blog Author Image URL:", finalAuthorImage);


  return (
    <div className="border border-gray-300 shadow-md p-4 rounded-md mb-8">
      <Link to={`/blog/${id}`}>
        <img
          src={finalImage}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "/fallback-blog.jpg";
          }}
          className="w-full h-60 object-cover rounded transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      </Link>

      <p className="text-blue-600 font-semibold mt-4">{category}</p>
      <h2 className="text-xl font-bold mt-2">{title}</h2>

      <div className="flex items-center gap-3 mt-4">
        <img
          src={finalAuthorImage}
          alt={author_name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-user.jpg";
          }}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="text-gray-800 font-medium">{author_name}</p>
          <p className="text-gray-500 text-sm">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
