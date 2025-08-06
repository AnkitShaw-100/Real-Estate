import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { FiShare2, FiHeart, FiMapPin, FiHome, FiUser, FiLayers, FiCalendar, FiStar, FiChevronLeft } from "react-icons/fi";

// Type definitions
interface ContactInfo {
    name: string;
    phone: string;
    email: string;
}

interface Property {
    id: number;
    title: string;
    price: string;
    location: string;
    type: string;
    area: string;
    builtYear: number;
    owner: string;
    description: string;
    amenities: string[];
    features: string[];
    rating: number;
    reviews: number;
    readyToMove: boolean;
    images: string[];
    floorPlan: string;
    address: string;
    contact: ContactInfo;
}

// Sample property data - in a real app, this would come from an API
const properties: Property[] = [
    {
        id: 1,
        title: "DLF Cyber Residency",
        price: "₹1.25 Cr",
        location: "Gurgaon, Haryana",
        type: "3 BHK Apartment",
        area: "1800 sq.ft",
        builtYear: 2020,
        owner: "DLF Group",
        description: "Luxury apartment in the heart of Gurgaon with premium amenities and excellent connectivity to business hubs and shopping centers.",
        amenities: ["Swimming Pool", "Gym", "Park", "24/7 Security", "Power Backup", "Clubhouse", "Children's Play Area", "Jogging Track"],
        features: ["Modular Kitchen", "Wooden Flooring", "Air Conditioning", "Parking", "Balcony", "Wi-Fi Connectivity"],
        rating: 4.8,
        reviews: 124,
        readyToMove: true,
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        floorPlan: "https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        address: "DLF Cyber City, Phase 2, Gurgaon, Haryana 122002",
        contact: {
            name: "Rajesh Kumar",
            phone: "+91 98765 43210",
            email: "sales@dlf.com"
        }
    },
    // ... other properties would follow the same structure
];

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [activeImage, setActiveImage] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [showContact, setShowContact] = useState<boolean>(false);

    // Handle the case where id might be undefined
    if (!id) {
        return <div className="p-8 text-center">Invalid property ID</div>;
    }

    const property = properties.find(p => p.id === parseInt(id, 10));

    if (!property) {
        return <div className="p-8 text-center">Property not found</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header with back button */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link to="/properties" className="flex items-center text-blue-900 hover:text-blue-700">
                        <FiChevronLeft className="h-5 w-5" />
                        <span className="ml-1">Back to Properties</span>
                    </Link>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FiHeart className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                            <FiShare2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Property title and basic info */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                    <div className="flex items-center mt-2 text-gray-600">
                        <FiMapPin className="h-4 w-4 mr-1" />
                        <span>{property.location}</span>
                    </div>
                    <div className="mt-4 flex items-center">
                        <div className="flex items-center bg-blue-100 text-blue-900 px-3 py-1 rounded-full mr-3">
                            <FiStar className="h-4 w-4 mr-1" />
                            <span>{property.rating} ({property.reviews} reviews)</span>
                        </div>
                        {property.readyToMove ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                Ready to Move
                            </span>
                        ) : (
                            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                                Under Construction
                            </span>
                        )}
                    </div>
                </div>

                {/* Image gallery */}
                <div className="mb-10">
                    <div className="relative h-96 w-full rounded-xl overflow-hidden mb-4">
                        <img
                            src={property.images[activeImage]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {property.images.map((img: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`h-24 rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-blue-500' : ''}`}
                            >
                                <img
                                    src={img}
                                    alt={`${property.title} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column - Property details */}
                    <div className="lg:col-span-2">
                        {/* Price section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                            <h2 className="text-2xl font-bold text-blue-900 mb-2">{property.price}</h2>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <div className="flex items-center text-gray-700">
                                    <FiHome className="h-5 w-5 mr-2 text-blue-900" />
                                    <span>{property.type}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FiLayers className="h-5 w-5 mr-2 text-blue-900" />
                                    <span>{property.area}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FiUser className="h-5 w-5 mr-2 text-blue-900" />
                                    <span>{property.owner}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FiCalendar className="h-5 w-5 mr-2 text-blue-900" />
                                    <span>Built in {property.builtYear}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                            <p className="text-gray-700">{property.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {property.amenities.map((amenity: string, index: number) => (
                                    <div key={index} className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            <FiStar className="h-4 w-4 text-blue-900" />
                                        </div>
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {property.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            <svg className="h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floor Plan */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Floor Plan</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <img
                                    src={property.floorPlan}
                                    alt={`${property.title} floor plan`}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right column - Contact and address */}
                    <div>
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Owner</h3>

                            {showContact ? (
                                <div>
                                    <div className="mb-4">
                                        <h4 className="font-medium text-gray-900">{property.contact.name}</h4>
                                        <p className="text-gray-600">{property.owner}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <a
                                            href={`tel:${property.contact.phone}`}
                                            className="flex items-center text-blue-900 hover:text-blue-700"
                                        >
                                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {property.contact.phone}
                                        </a>
                                        <a
                                            href={`mailto:${property.contact.email}`}
                                            className="flex items-center text-blue-900 hover:text-blue-700"
                                        >
                                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {property.contact.email}
                                        </a>
                                    </div>
                                    <button
                                        onClick={() => setShowContact(false)}
                                        className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Hide contact
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowContact(true)}
                                    className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Show Contact Details
                                </button>
                            )}

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Address</h3>
                                <div className="flex items-start">
                                    <FiMapPin className="h-5 w-5 text-blue-900 mr-3 mt-0.5" />
                                    <p className="text-gray-700">{property.address}</p>
                                </div>

                                <div className="mt-6">
                                    <button className="w-full bg-white border border-blue-900 text-blue-900 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        Schedule Site Visit
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Similar properties could be added here */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PropertyDetails;