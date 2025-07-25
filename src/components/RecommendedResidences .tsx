import { motion } from "framer-motion";

const residences = [
  {
    name: "DLF Cyber Residency",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    price: "₹1.25 Cr",
    owner: "DLF Group",
    location: "Gurgaon, Haryana",
    type: "3 BHK Apartment"
  },
  {
    name: "Lodha Altamount",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    price: "₹5.7 Cr",
    owner: "Lodha Group",
    location: "Mumbai, Maharashtra",
    type: "4 BHK Luxury Flat"
  },
  {
    name: "Prestige Lakeside Habitat",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    price: "₹2.1 Cr",
    owner: "Prestige Group",
    location: "Bangalore, Karnataka",
    type: "3 BHK Villa"
  },
  {
    name: "Sobha City",
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
    price: "₹1.6 Cr",
    owner: "Sobha Developers",
    location: "Delhi NCR",
    type: "3 BHK Apartment"
  },
  {
    name: "Godrej Garden City",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    price: "₹85 Lakh",
    owner: "Godrej Properties",
    location: "Ahmedabad, Gujarat",
    type: "2 BHK Flat"
  }
];

const RecommendedResidences = () => {
  return (
    <section className="w-full bg-gray-50 px-6 sm:px-16 py-20 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug">
            Our Recommended <br /> Comfortable Residences
          </h2>
        </div>
        <div className="text-gray-600 max-w-xl text-base">
          Discover handpicked homes in top Indian cities with transparent pricing, trustworthy builders, and excellent connectivity. Homes that suit your family and finances.
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition">
          Explore More
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {residences.map((res, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={res.img}
              alt={res.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-5 space-y-3 text-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-semibold">{res.name}</h3>
                <span className="text-blue-500 text-lg sm:text-xl font-bold">
                  {res.price}
                </span>
              </div>

              <div className="text-sm text-gray-500">{res.location}</div>

              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <div>
                  <span className="font-medium">Type: </span>
                  {res.type}
                </div>
                <div>
                  <span className="font-medium">Owner: </span>
                  {res.owner}
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default RecommendedResidences;
