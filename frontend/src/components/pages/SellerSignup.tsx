import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image3 from "../../assets/exterior/image7.jpg";
import apiClient from "../../services/api.ts";

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

const SellerSignup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      if (!form.name || !form.email || !form.phone || !form.password) {
        throw new Error("All fields are required");
      }

      if (form.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Phone number validation (10 digits)
      if (!/^[0-9]{10}$/.test(form.phone)) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        throw new Error("Please enter a valid email address");
      }

      const userData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "seller"
      };

      const response = await apiClient.register(userData);
      
      if (response.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        // Clear form
        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create account. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goToBuyer = () => {
    navigate("/signup/buyer");
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
            Create Seller Account
          </motion.h2>
          <motion.p
            className="text-sm text-gray-500 mb-6"
            variants={itemVariants}
          >
            Sign up as seller to list your properties and reach potential buyers.
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
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "Ankit Shaw",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "example@domain.com",
              },
              {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "9876543210",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "••••••••",
              },
            ].map((field, index) => (
              <motion.div key={index} variants={itemVariants}>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800 text-white"
              }`}
              variants={itemVariants}
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
            >
              {loading ? "Creating Account..." : "Register as Seller"}
            </motion.button>
          </motion.form>

          <motion.p className="text-sm text-center mt-6 text-gray-500" variants={itemVariants}>
            Already have an account?{" "}
            <a href="/login" className="text-blue-800 font-medium hover:underline">
              Log in
            </a>
          </motion.p>

          {/* Buyer Redirect */}
          <motion.button
            onClick={goToBuyer}
            className="mt-6 w-full border border-blue-900 text-blue-900 hover:bg-blue-50 py-2 rounded-lg font-semibold transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Sign Up as Buyer
          </motion.button>
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

export default SellerSignup;
