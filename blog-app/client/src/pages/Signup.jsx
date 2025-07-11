import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Manual validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!formData.image) {
      toast.error("Profile image is required");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", formData.image);

      setLoading(true);

      const res = await fetch(
        "https://shiera-backend-15.onrender.com/user/register",
        {
          method: "POST",
          body: data,
        }
      );

      const resData = await res.json();
      console.log(resData);

      if (resData.success) {
        toast.success(resData.message);
        navigate("/login");
      } else {
        toast.error(resData.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-7 mx-auto flex items-center justify-center">
      <div className="w-full bg-white max-w-md px-8 mx-auto py-6 border-1 border-gray-200 shadow-2xl">
        <h1 className="text-lg font-bold text-center text-gray-700">
          Create your account!
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 mt-5 w-full"
        >
          <input
            onChange={onChangeHandler}
            name="name"
            value={formData.name}
            type="text"
            placeholder="Your name"
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Your email"
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Your password"
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <input
            onChange={fileHandler}
            accept="image/*"
            type="file"
            className="w-full cursor-pointer p-2 border bg-amber-50 border-gray-300 rounded outline-none"
          />
          <button
            disabled={loading}
            className={`${
              loading
                ? "bg-orange-400 cursor-not-allowed "
                : "bg-orange-600 cursor-pointer"
            } text-white px-6 py-2 w-full`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-orange-600 cursor-pointer">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
