import axios from "axios";
const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000",
  baseURL: "https://shiera-backend-10.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
