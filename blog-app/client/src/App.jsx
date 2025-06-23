import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBloge";
import BlogDetails from "./pages/BlogDetail";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
