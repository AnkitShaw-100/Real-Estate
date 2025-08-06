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
    type: "3 BHK Apartment",
    area: "1800 sq.ft",
    amenities: ["Swimming Pool", "Gym", "Park", "24/7 Security"],
    rating: 4.8,
    reviews: 124,
    readyToMove: true
  },
  {
    name: "Lodha Altamount",
    img: image2,
    price: "₹5.7 Cr",
    owner: "Lodha Group",
    location: "Mumbai, Maharashtra",
    type: "4 BHK Luxury Flat",
    area: "3200 sq.ft",
    amenities: ["Clubhouse", "Jacuzzi", "Concierge", "Private Theater"],
    rating: 4.9,
    reviews: 89,
    readyToMove: true
  },
  {
    name: "Prestige Lakeside Habitat",
    img: image3,
    price: "₹2.1 Cr",
    owner: "Prestige Group",
    location: "Bangalore, Karnataka",
    type: "3 BHK Villa",
    area: "2400 sq.ft",
    amenities: ["Private Garden", "Lake View", "Modular Kitchen", "Solar Panels"],
    rating: 4.7,
    reviews: 156,
    readyToMove: false,
    possession: "Dec 2024"
  },
  {
    name: "Sobha City",
    img: image4,
    price: "₹1.6 Cr",
    owner: "Sobha Developers",
    location: "Delhi NCR",
    type: "3 BHK Apartment",
    area: "1650 sq.ft",
    amenities: ["Kids Play Area", "Party Hall", "Jogging Track", "Power Backup"],
    rating: 4.6,
    reviews: 210,
    readyToMove: true
  },
  {
    name: "Godrej Garden City",
    img: image5,
    price: "₹85 Lakh",
    owner: "Godrej Properties",
    location: "Ahmedabad, Gujarat",
    type: "2 BHK Flat",
    area: "1200 sq.ft",
    amenities: ["Landscaped Gardens", "Yoga Deck", "Badminton Court", "Cafeteria"],
    rating: 4.5,
    reviews: 178,
    readyToMove: true
  },
  {
    name: "Brigade Orchards",
    img: image6,
    price: "₹2.75 Cr",
    owner: "Brigade Group",
    location: "Chennai, Tamil Nadu",
    type: "3 BHK Farmhouse",
    area: "2800 sq.ft",
    amenities: ["Organic Farm", "Pool", "Gym", "Walking Trails"],
    rating: 4.7,
    reviews: 92,
    readyToMove: false,
    possession: "Mar 2025"
  }
];

const RecommendedResidences = () => {
  return (
    <section className="w-full bg-gray-50 px-4 sm:px-8 py-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6 px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight mb-3">
              Our Carefully Selected <span className="text-blue-900">Premium Residences</span>
            </h2>
            <p className="text-gray-600 text-base">
              Discover handpicked homes in India's top cities with transparent pricing, reputable builders, and excellent connectivity.
              Each property is vetted for quality and value.
            </p>
          </div>
          <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
            Explore All Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Property Cards Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {residences.map((res, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with Badge */}
              <div className="relative">
                <img
                  src={res.img}
                  alt={res.name}
                  className="h-64 w-full object-cover"
                />
                {res.readyToMove ? (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Ready to Move
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Under Construction
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-blue-900 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {res.rating} ({res.reviews})
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{res.name}</h3>
                    <p className="text-sm text-gray-500">{res.location}</p>
                  </div>
                  <span className="text-blue-900 font-bold text-xl">
                    {res.price}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-blue-100 text-blue-900 text-xs px-3 py-1 rounded-full">{res.type}</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">{res.area}</span>
                  {!res.readyToMove && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">Possession: {res.possession}</span>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {res.amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="bg-gray-50 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white text-sm py-2.5 rounded-lg transition-all font-medium flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View Details
                  </button>
                  <button className="flex-1 border border-blue-900 text-blue-900 hover:bg-blue-50 text-sm py-2.5 rounded-lg transition-all font-medium flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="mt-16 text-center">
          <button className="bg-white text-blue-900 border border-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
            Load More Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedResidences;