import axios from "../utils/axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Manual validation
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-7 mx-auto flex items-center justify-center">
      <div className="w-full bg-white max-w-md px-8 mx-auto py-6 border-1 border-gray-200 shadow-2xl">
        <h1 className="text-lg font-bold text-center text-gray-700">
          Login into your account!
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 mt-5 w-full"
        >
          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            className="w-full p-2 border border-gray-300 rounded outline-none"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Your password"
            className="w-full p-2 border border-gray-300 rounded outline-none"
            required
          />
          <button
            disabled={loading}
            className={`${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 cursor-pointer"
            } text-white px-6 py-2 w-full`}
          >
            {loading ? "Signing in..." : "Signin"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-orange-600 cursor-pointer">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
