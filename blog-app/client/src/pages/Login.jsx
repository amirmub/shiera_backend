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
  const [errors, setErrors] = useState({});
  const { loginUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post("/user/login", formData);
      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-7 mx-auto flex items-center justify-center">
      <div className="w-full bg-white max-w-md px-8 py-8  shadow-2xl">
        <h1 className="text-lg font-bold text-center text-gray-700">
          Login into your account!
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-5">
          <div>
            <input
              autoFocus
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              placeholder="Your email"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded outline-none`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="Your password"
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded outline-none`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

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
          <Link to="/register" className="text-orange-600">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
