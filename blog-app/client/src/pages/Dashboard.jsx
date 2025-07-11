import axios, { BASE_URL } from "../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit3, Trash, Save, X } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  const [editImage, setEditImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    setEditImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await axios.post("/blog/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
      });
      fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/blog/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const removeBlog = async (blogId) => {
    try {
      const res = await axios.delete(`/blog/delete/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEditClick = (blog) => {
    setEditingId(blog._id);
    setEditData({ title: blog.title, description: blog.description });
    setEditImage(null);
  };

  const handleSaveEdit = async (id) => {
    const data = new FormData();
    data.append("title", editData.title);
    data.append("description", editData.description);
    if (editImage) {
      data.append("image", editImage);
    }

    try {
      const res = await axios.put(`/blog/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      fetchBlogs();
      setEditingId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  const Spinner = () => (
    <div className="flex justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:w-64 w-full bg-gray-800 p-6 text-white">
        <h2 className="text-lg font-bold mb-6">Dashboard</h2>
        <button
          className={`block w-full cursor-pointer py-2 px-4 mb-2 rounded transition ${
            activeTab === "post" ? "bg-orange-500" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Post a Blog
        </button>
        <button
          className={`block w-full py-2 px-4 cursor-pointer rounded transition ${
            activeTab === "list" ? "bg-orange-500" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Manage Blogs
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "post" ? (
          <div className="max-w-lg mx-12 mt-6 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Post a New Blog</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <input
                name="title"
                value={formData.title}
                onChange={onChangeHandler}
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                type="text"
                placeholder="Category"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={onChangeHandler}
                placeholder="Description"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <div>
                <label className="block cursor-pointer text-sm mb-1">Choose Image</label>
                <input
                  onChange={fileHandler}
                  name="image"
                  type="file"
                  accept="image/*"
                  className="border cursor-pointer border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white rounded-full py-2 font-semibold transition">
                Post Blog
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mt-4 mb-6">List of Blogs</h2>
            {loading ? (
              <Spinner />
            ) : (
              <div className="overflow-x-auto rounded-lg shadow mb-12">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left font-bold uppercase tracking-wider w-1/3">Description</th>
                      <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-center font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blog, index) => (
                      <tr
                        key={blog._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === blog._id ? (
                            <input
                              name="title"
                              value={editData.title}
                              onChange={handleEditInputChange}
                              className="border p-1 rounded w-full"
                            />
                          ) : (
                            <div className="text-gray-900 font-medium">{blog.title}</div>
                          )}
                        </td>

                        <td className="px-6 py-4 max-w-xs">
                          {editingId === blog._id ? (
                            <textarea
                              name="description"
                              value={editData.description}
                              onChange={handleEditInputChange}
                              className="border p-1 rounded w-full"
                            />
                          ) : (
                            <div className="text-gray-700 line-clamp-2">
                              {blog.description}
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === blog._id ? (
                            <input
                              type="file"
                              name="image"
                              onChange={handleEditImageChange}
                              accept="image/*"
                              className="p-1 border rounded w-full"
                            />
                          ) : (
                            <img
                              src={`${BASE_URL}/images/${blog.image}`}
                              alt={blog.title}
                              className="h-12 w-12 rounded object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fallback-blog.jpg";
                              }}
                            />
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap  flex justify-center gap-3">
                          {editingId === blog._id ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(blog._id)}
                                className="flex items-center cursor-pointer gap-1 text-green-600 hover:text-green-800"
                              >
                                <Save size={18} />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="flex items-center cursor-pointer gap-1 text-gray-600 hover:text-gray-800"
                              >
                                <X size={18} />
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(blog)}
                                className="flex items-center cursor-pointer gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <Edit3 size={20} />
                                Edit
                              </button>
                              <button
                                onClick={() => removeBlog(blog._id)}
                                className="flex cursor-pointer items-center gap-1 text-red-600 hover:text-red-800"
                              >
                                <Trash size={20} />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
