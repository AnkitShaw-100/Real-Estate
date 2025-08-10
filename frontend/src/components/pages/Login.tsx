import React, { useState } from "react";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import image3 from "../../assets/exterior/image3.jpg";
import { useAuth } from "../../context/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate form
      if (!form.email || !form.password) {
        throw new Error("Email and password are required");
      }

      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        throw new Error("Please enter a valid email address");
      }

      await login(form.email, form.password);
      
      setSuccess("Login successful! Redirecting...");
      
      // Clear form
      setForm({
        email: "",
        password: "",
      });
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-5xl w-full bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row transform -translate-y-[8%]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left - Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-4"
            variants={itemVariants}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            className="text-sm text-gray-500 mb-6"
            variants={itemVariants}
          >
            Sign in to your account to continue browsing properties.
          </motion.p>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              variants={itemVariants}
            >
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div
              className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
              variants={itemVariants}
            >
              {success}
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
                placeholder="Enter your password"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800 text-white"
              }`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              variants={itemVariants}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </motion.form>

          {/* OR divider */}
          <motion.div className="flex items-center my-6" variants={itemVariants}>
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </motion.div>

          {/* Social Login */}
          <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
            <button
              className="p-3 border border-gray-300 rounded-full bg-white shadow-sm transition hover:scale-105 focus:ring-2 focus:ring-gray-400"
              aria-label="Sign in with GitHub"
            >
              <FaGithub className="text-gray-700 text-xl" />
            </button>
            <button
              className="p-3 border border-gray-300 rounded-full bg-white shadow-sm transition hover:scale-105 focus:ring-2 focus:ring-blue-300"
              aria-label="Sign in with Facebook"
            >
              <FaFacebookF className="text-blue-600 text-xl" />
            </button>
          </motion.div>

          <motion.p className="text-sm text-center mt-6 text-gray-500" variants={itemVariants}>
            Don't have an account?{" "}
            <Link to="/signup/buyer" className="text-blue-800 font-medium hover:underline">
              Sign up
            </Link>
          </motion.p>

          {/* Forgot Password */}
          <motion.p className="text-sm text-center mt-2 text-gray-500" variants={itemVariants}>
            <a href="#" className="text-blue-800 font-medium hover:underline">
              Forgot your password?
            </a>
          </motion.p>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          className="w-full md:w-1/2 hidden md:block"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img
            src={image3}
            alt="Property Showcase"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login; 