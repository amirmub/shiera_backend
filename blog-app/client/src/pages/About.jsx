import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <section className="bg-white py-8 px-120 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-orange-600">MyBlog</span>
        </motion.h1>

        {[
          "MyBlog is a premier platform dedicated to fostering insightful dialogue and inspiring storytelling. We curate and showcase voices that matter — from industry experts and visionary creators to passionate enthusiasts.",
          "Our goal is to cultivate a vibrant community where knowledge flows freely and ideas spark innovation. Whether you’re a seasoned thought leader, an emerging writer, or an inquisitive reader, MyBlog is your go-to space for meaningful content.",
        ].map((text, i) => (
          <motion.p
            key={i}
            className="text-xl text-gray-700 leading-relaxed mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 * (i + 1) }}
          >
            {i === 0 ? (
              <>
                <span className="font-semibold text-gray-900">MyBlog</span> {text.slice(6)}
              </>
            ) : (
              text
            )}
          </motion.p>
        ))}
      </div>

      <motion.div
        className="mt-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80"
          alt="Team collaborating on project"
          className="rounded-xl shadow-xl  object-cover cursor-pointer"
        />
      </motion.div>
    </section>
  );
};

export default About;
