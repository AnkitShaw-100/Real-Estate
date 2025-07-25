import React from "react";
import { motion } from "framer-motion";

const residences = [
  {
    name: "Permata Hijau Suites",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Cahaya Alam Setia",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Sudirman Apartment",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dharma Residence",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "SouthPark Living",
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=500&q=80"
  }
];

const RecommendedResidences = () => {
  return (
    <section className="w-full bg-gray-50 px-6 sm:px-16 py-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Our Recommended <br /> Comfortable Residence
          </h2>
        </div>
        <div className="text-gray-600 max-w-md">
          We have a recommendation for a comfortable house for your family at a
          low price with a secure agreement of 10% without interest, can be
          paid in installments for 5 years.
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition">
          See More
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex gap-6 overflow-x-auto pb-4"
      >
        {residences.map((res, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 sm:w-64 rounded-3xl overflow-hidden shadow-md bg-white hover:shadow-xl transition"
          >
            <img
              src={res.img}
              alt={res.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-3 text-center text-gray-800 font-semibold text-sm sm:text-base">
              {res.name}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default RecommendedResidences;
