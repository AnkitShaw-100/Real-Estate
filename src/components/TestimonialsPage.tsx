import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Endang Susanti",
        role: "Product Developer",
        image:
            "https://randomuser.me/api/portraits/women/44.jpg",
        text:
            "Asooooyyys, I once bought a house with this proash agency! Now I live in a comfortable and safe apartment of course. Low prices, easy payments, no hassle at all."
    },
    {
        name: "Michael Chen",
        role: "UI Designer",
        image:
            "https://randomuser.me/api/portraits/men/36.jpg",
        text:
            "Buying through this platform was smooth and transparent. I got excellent support throughout and the property was just as expected."
    },
    {
        name: "Anjali Mehta",
        role: "Marketing Lead",
        image:
            "https://randomuser.me/api/portraits/women/65.jpg",
        text:
            "Fantastic experience! The team helped me find the right rental and guided me with every legal and documentation step."
    }
];

const TestimonialsPage = () => {
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-gray-50 py-16 px-6 sm:px-16 text-center font-sans">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6"
            >
                Testimonials Our Clients
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white max-w-3xl mx-auto rounded-2xl shadow-md px-8 py-10"
            >
                <FaQuoteLeft className="text-4xl text-blue-600 mb-4 mx-auto" />
                <p className="text-gray-700 text-lg italic mb-6">
                    "{testimonials[current].text}"
                </p>
                <div className="flex flex-col items-center">
                    <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-14 h-14 rounded-full mb-2"
                    />
                    <p className="font-semibold text-gray-800">
                        {testimonials[current].name}
                    </p>
                    <p className="text-sm text-gray-500">
                        {testimonials[current].role}
                    </p>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${i === current ? "bg-blue-600 w-4" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TestimonialsPage;
