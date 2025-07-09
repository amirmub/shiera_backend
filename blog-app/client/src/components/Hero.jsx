import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white py-14 px-6 md:px-12 text-center">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
      Elevate Your Voice.<br />
      Share Stories That Matter.
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-600">
      Welcome to <span className="font-semibold text-orange-500">B<span className="font-bold">log</span></span> — a modern platform to write, read, and connect through powerful content.
    </p>
    <div className="mt-10 flex justify-center gap-4 flex-wrap">
      <Link
        to="/blogs"
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium transition duration-300"
      >
        Browse Blogs
      </Link>
      <Link
        to="/login"
        className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full text-lg font-medium transition duration-300"
      >
        Get Started
      </Link>
    </div>
  </div>
</section>

  );
};
export default Hero;
