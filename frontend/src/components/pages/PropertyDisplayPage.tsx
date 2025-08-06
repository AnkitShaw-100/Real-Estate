import { useState } from "react";
import image1 from "../../assets/interior/image1.jpg";
import image2 from "../../assets/interior/image2.jpg";
import image3 from "../../assets/interior/image3.jpg";
import image4 from "../../assets/interior/image4.jpg";
import image5 from "../../assets/interior/image5.jpg";
import image6 from "../../assets/interior/image6.jpg";
import image7 from "../../assets/interior/image7.jpg";
import image8 from "../../assets/interior/image8.jpg";
import image9 from "../../assets/interior/image9.jpg";

// Type definitions
interface Property {
    id: number;
    name: string;
    img: string;
    price: string;
    owner: string;
    location: string;
    type: string;
    area: string;
    amenities: string[];
    rating: number;
    reviews: number;
    readyToMove: boolean;
    possession?: string;
    listedByUser: boolean;
}

type TabType = "all" | "my-listings" | "favorites";

const PropertyDisplayPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (propertyId: number): void => {
        if (favorites.includes(propertyId)) {
            setFavorites(favorites.filter(id => id !== propertyId));
        } else {
            setFavorites([...favorites, propertyId]);
        }
    };

    const residences: Property[] = [
        {
            id: 1,
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
            readyToMove: true,
            listedByUser: false
        },
        {
            id: 2,
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
            readyToMove: true,
            listedByUser: false
        },
        {
            id: 3,
            name: "Prestige Lakeside Habitat",
            img: image3,
            price: "₹2.1 Cr",
            owner: "Prestige Group",
            location: "Bangalore, Karnataka",
            type: "3 BHK Villa",
            area: "2400 sq.ft",
            amenities: ["Private Garden", "Lake View", "Modular Kitchen"],
            rating: 4.7,
            reviews: 156,
            readyToMove: false,
            possession: "Dec 2024",
            listedByUser: true
        },
        {
            id: 4,
            name: "Sobha City",
            img: image4,
            price: "₹1.6 Cr",
            owner: "Sobha Developers",
            location: "Delhi NCR",
            type: "3 BHK Apartment",
            area: "1650 sq.ft",
            amenities: ["Kids Play Area", "Party Hall", "Jogging Track"],
            rating: 4.6,
            reviews: 210,
            readyToMove: true,
            listedByUser: false
        },
        {
            id: 5,
            name: "Godrej Garden City",
            img: image5,
            price: "₹85 Lakh",
            owner: "Godrej Properties",
            location: "Ahmedabad, Gujarat",
            type: "2 BHK Flat",
            area: "1200 sq.ft",
            amenities: ["Landscaped Gardens", "Yoga Deck", "Cafeteria"],
            rating: 4.5,
            reviews: 178,
            readyToMove: true,
            listedByUser: false
        },
        {
            id: 6,
            name: "Brigade Orchards",
            img: image6,
            price: "₹2.75 Cr",
            owner: "Brigade Group",
            location: "Chennai, Tamil Nadu",
            type: "3 BHK Farmhouse",
            area: "2800 sq.ft",
            amenities: ["Organic Farm", "Pool", "Walking Trails"],
            rating: 4.7,
            reviews: 92,
            readyToMove: false,
            possession: "Mar 2025",
            listedByUser: true
        },
        {
            id: 7,
            name: "Tata Primanti",
            img: image7,
            price: "₹3.2 Cr",
            owner: "Tata Housing",
            location: "Gurgaon, Haryana",
            type: "4 BHK Apartment",
            area: "2200 sq.ft",
            amenities: ["Sky Lounge", "Spa", "Indoor Games"],
            rating: 4.8,
            reviews: 115,
            readyToMove: true,
            listedByUser: false
        },
        {
            id: 8,
            name: "Mahindra Lifespaces",
            img: image8,
            price: "₹1.9 Cr",
            owner: "Mahindra Group",
            location: "Pune, Maharashtra",
            type: "3 BHK Flat",
            area: "1750 sq.ft",
            amenities: ["Amphitheater", "Co-working Space", "Yoga Deck"],
            rating: 4.6,
            reviews: 132,
            readyToMove: true,
            listedByUser: false
        },
        {
            id: 9,
            name: "Hiranandani Parks",
            img: image9,
            price: "₹4.5 Cr",
            owner: "Hiranandani Group",
            location: "Mumbai, Maharashtra",
            type: "5 BHK Penthouse",
            area: "3800 sq.ft",
            amenities: ["Private Pool", "Home Theater", "Servant Quarter"],
            rating: 4.9,
            reviews: 67,
            readyToMove: true,
            listedByUser: false
        }
    ];

    const filteredProperties = (): Property[] => {
        switch (activeTab) {
            case "all":
                return residences;
            case "my-listings":
                return residences.filter(property => property.listedByUser);
            case "favorites":
                return residences.filter(property => favorites.includes(property.id));
            default:
                return residences;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white p-6 hidden sm:block sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                    </div>
                    <h2 className="text-xl font-semibold">UrbanNest</h2>
                </div>

                <ul className="space-y-3">
                    <li
                        className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${activeTab === "all" ? "bg-blue-800" : "hover:bg-blue-800/50"}`}
                        onClick={() => setActiveTab("all")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        All Properties
                    </li>
                    <li
                        className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${activeTab === "my-listings" ? "bg-blue-800" : "hover:bg-blue-800/50"}`}
                        onClick={() => setActiveTab("my-listings")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 010-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        My Listings
                    </li>
                    <li
                        className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${activeTab === "favorites" ? "bg-blue-800" : "hover:bg-blue-800/50"}`}
                        onClick={() => setActiveTab("favorites")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        Favorites
                        {favorites.length > 0 && (
                            <span className="ml-auto bg-blue-600 text-xs px-2 py-1 rounded-full">
                                {favorites.length}
                            </span>
                        )}
                    </li>
                    <li className="p-3 rounded-lg cursor-pointer flex items-center gap-3 hover:bg-blue-800/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Account Settings
                    </li>
                </ul>

                <div className="mt-auto pt-6 border-t border-blue-800">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium">Ankit Shaw</p>
                            <p className="text-xs text-blue-200">Premium Member</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {activeTab === "all" && "All Properties"}
                                {activeTab === "my-listings" && "My Listings"}
                                {activeTab === "favorites" && "Favorite Properties"}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {filteredProperties().length} properties found
                            </p>
                        </div>
                        <button className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-all flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add New Property
                        </button>
                    </div>

                    {/* Property Cards Grid */}
                    {filteredProperties().length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProperties().map((res) => (
                                <div
                                    key={res.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image with Badges */}
                                    <div className="relative">
                                        <img
                                            src={res.img}
                                            alt={res.name}
                                            className="h-60 w-full object-cover"
                                        />
                                        {res.readyToMove ? (
                                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                Ready to Move
                                            </div>
                                        ) : (
                                            <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                Possession: {res.possession}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => toggleFavorite(res.id)}
                                            className={`absolute top-3 right-3 p-2 rounded-full ${favorites.includes(res.id) ? "bg-red-500 text-white" : "bg-white text-gray-700"}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        {res.listedByUser && (
                                            <div className="absolute bottom-3 left-3 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                Your Listing
                                            </div>
                                        )}
                                    </div>

                                    {/* Property Details */}
                                    <div className="p-5 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{res.name}</h3>
                                                <p className="text-sm text-gray-500">{res.location}</p>
                                            </div>
                                            <span className="text-blue-900 font-bold text-lg">
                                                {res.price}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            <span className="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded-full">{res.type}</span>
                                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{res.area}</span>
                                            <div className="flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {res.rating} ({res.reviews})
                                            </div>
                                        </div>

                                        <div className="pt-3">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Amenities:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {res.amenities.slice(0, 3).map((amenity, i) => (
                                                    <span key={i} className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                        {amenity}
                                                    </span>
                                                ))}
                                                {res.amenities.length > 3 && (
                                                    <span className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-full">
                                                        +{res.amenities.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white text-sm py-2 rounded-lg transition-all font-medium">
                                                View Details
                                            </button>
                                            {res.listedByUser && (
                                                <button className="flex-1 border border-blue-900 text-blue-900 hover:bg-blue-50 text-sm py-2 rounded-lg transition-all font-medium">
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-700 mt-4">
                                {activeTab === "favorites" ? "No favorite properties yet" : "No properties found"}
                            </h3>
                            <p className="text-gray-500 mt-1">
                                {activeTab === "favorites"
                                    ? "Save properties to your favorites to see them here"
                                    : "Try adjusting your search or filters"}
                            </p>
                            {activeTab === "favorites" && (
                                <button
                                    className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-all"
                                    onClick={() => setActiveTab("all")}
                                >
                                    Browse Properties
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredProperties().length > 0 && (
                        <div className="mt-10 flex justify-center">
                            <nav className="flex items-center gap-1">
                                <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button className="px-4 py-1 rounded-md bg-blue-900 text-white font-medium">1</button>
                                <button className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
                                <button className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
                                <span className="px-2 text-gray-500">...</span>
                                <button className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">8</button>
                                <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PropertyDisplayPage;