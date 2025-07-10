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
  // Fix for inconsistent image format (filename vs full URL)
  const finalImage = image?.startsWith("http")
    ? image
    : `https://shiera-backend-14.onrender.com/images/${image}`;

  const finalAuthorImage = author_image?.startsWith("http")
    ? author_image
    : `https://shiera-backend-14.onrender.com/images/${author_image}`;

  return (
    <div className="border border-gray-300 shadow-md p-4 rounded-md mb-8">
      <Link to={`/blog/${id}`}>
        <img
          src={finalImage || "/fallback-blog.jpg"}
          alt={title}
          className="rounded w-full h-60 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      </Link>

      <p className="text-blue-600 font-semibold mt-4">{category}</p>
      <h2 className="text-xl font-bold mt-2">{title}</h2>

      <div className="flex items-center gap-3 mt-4">
        <img
          src={finalAuthorImage || "/fallback-user.jpg"}
          alt={author_name}
          className="w-10 h-10 rounded-full object-cover"
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
