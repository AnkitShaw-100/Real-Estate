import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaHandshake, FaKey, FaChartLine } from "react-icons/fa";

const services = [
  {
    title: "Buy a Home",
    icon: <FaHome size={40} className="text-blue-600" />,
    desc: "Explore a wide range of properties and find your dream home with expert guidance."
  },
  {
    title: "Sell Your Property",
    icon: <FaHandshake size={40} className="text-green-600" />,
    desc: "List your property with us and connect with serious buyers for quick, secure sales."
  },
  {
    title: "Rent Properties",
    icon: <FaKey size={40} className="text-yellow-500" />,
    desc: "Find affordable and verified rental homes in your preferred locations."
  },
  {
    title: "Market Insights",
    icon: <FaChartLine size={40} className="text-purple-600" />,
    desc: "Get real-time data and price trends to make informed real estate decisions."
  }
];

const Services = () => {
  return (
    <div className="w-full bg-white font-sans px-6 sm:px-16 py-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-gray-800"
        >
          Services We Offer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-lg mt-4"
        >
          We simplify your real estate journey
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gray-50 hover:bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border border-gray-100"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;