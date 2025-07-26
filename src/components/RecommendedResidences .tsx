import image1 from "../assets/interior/image1.jpg";
import image2 from "../assets/interior/image2.jpg";
import image3 from "../assets/interior/image3.jpg";
import image4 from "../assets/interior/image4.jpg";
import image5 from "../assets/interior/image5.jpg";
import image6 from "../assets/interior/image6.jpg";

const residences = [
  {
    name: "DLF Cyber Residency",
    img: image1,
    price: "₹1.25 Cr",
    owner: "DLF Group",
    location: "Gurgaon, Haryana",
    type: "3 BHK Apartment"
  },
  {
    name: "Lodha Altamount",
    img: image2,
    price: "₹5.7 Cr",
    owner: "Lodha Group",
    location: "Mumbai, Maharashtra",
    type: "4 BHK Luxury Flat"
  },
  {
    name: "Prestige Lakeside Habitat",
    img: image3,
    price: "₹2.1 Cr",
    owner: "Prestige Group",
    location: "Bangalore, Karnataka",
    type: "3 BHK Villa"
  },
  {
    name: "Sobha City",
    img: image4,
    price: "₹1.6 Cr",
    owner: "Sobha Developers",
    location: "Delhi NCR",
    type: "3 BHK Apartment"
  },
  {
    name: "Godrej Garden City",
    img: image5,
    price: "₹85 Lakh",
    owner: "Godrej Properties",
    location: "Ahmedabad, Gujarat",
    type: "2 BHK Flat"
  },
  {
    name: "Godrej Garden City",
    img: image6,
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
        <button className="bg-blue-900 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition">
          Explore More
        </button>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {residences.map((res, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={res.img}
              alt={res.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-5 space-y-4 text-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{res.name}</h3>
                <span className="text-blue-900 font-bold text-lg">
                  {res.price}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">📍 Location: </span>{res.location}
              </div>

              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">🏠 Type: </span>{res.type}
              </div>

              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">👤 Owner: </span>{res.owner}
              </div>

              <button className="mt-4 w-full bg-blue-900 hover:bg-blue-800 text-white text-sm py-2 rounded-lg transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedResidences;
