import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
    {
        name: "Endang Susanti",
        role: "Product Developer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text:
            "I once bought a house with this agency! Now I live in a comfortable and safe apartment. Low prices, easy payments, no hassle at all."
    },
    {
        name: "Michael Chen",
        role: "UI Designer",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
        text:
            "Buying through this platform was smooth and transparent. I got excellent support throughout and the property was just as expected."
    },
    {
        name: "Anjali Mehta",
        role: "Marketing Lead",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text:
            "Fantastic experience! The team helped me find the right rental and guided me with every legal and documentation step."
    }
];

const TestimonialsPage = () => {
    const [current, setCurrent] = React.useState(0);

    const nextTestimonial = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="bg-gray-50 py-16 px-6 sm:px-16 text-center font-sans">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12"
            >
                What Our Clients Say
            </motion.h2>

            <div className="max-w-3xl mx-auto relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-3xl shadow-md px-8 py-10"
                    >
                        <FaQuoteLeft className="text-4xl text-blue-600 mb-4 mx-auto" />
                        <p className="text-gray-700 text-lg italic mb-6">
                            "{testimonials[current].text}"
                        </p>
                        <div className="flex flex-col items-center">
                            <img
                                src={testimonials[current].image}
                                alt={testimonials[current].name}
                                className="w-16 h-16 rounded-full mb-2"
                            />
                            <p className="font-semibold text-gray-800">
                                {testimonials[current].name}
                            </p>
                            <p className="text-sm text-gray-500">{testimonials[current].role}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 px-6 sm:px-10">
                    <button
                        onClick={prevTestimonial}
                        className="text-blue-500 hover:text-blue-600 transition text-lg flex items-center gap-1"
                    >
                        <FaChevronLeft />
                        Previous
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="text-blue-500 hover:text-blue-600 transition text-lg flex items-center gap-1"
                    >
                        Next <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsPage;
