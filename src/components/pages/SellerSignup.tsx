import React, { useState } from "react";
import { motion } from "framer-motion";
import image3 from "../../assets/exterior/image7.jpg";

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
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller Info Submitted:", form);
    // Add API logic here
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-5xl w-full bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row transform -translate-y-[5vh]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left - Seller Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-2"
            variants={itemVariants}
          >
            Register as a Seller
          </motion.h2>
          <motion.p
            className="text-sm text-gray-500 mb-6"
            variants={itemVariants}
          >
            List and manage your properties in just a few steps.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
          >
            {[
              {
                label: "Full Name",
                name: "fullName",
                type: "text",
                placeholder: "John Doe",
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
                placeholder: "+91 98765 43210",
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
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Register as Seller
            </motion.button>
          </motion.form>

          <motion.p
            className="text-sm text-center mt-6 text-gray-500"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <a href="#" className="text-blue-900 font-medium hover:underline">
              Log in
            </a>
          </motion.p>
        </motion.div>

        {/* Right - Property Image */}
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
