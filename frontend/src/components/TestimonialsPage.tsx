import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
    {
        name: "Amit Sharma",
        role: "Software Engineer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        text:
            "The team made my first home purchase in Bangalore seamless. Their guidance and transparency were truly impressive. Highly recommended!"
    },
    {
        name: "Rahul Verma",
        role: "UI Designer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        text:
            "Excellent service and support! They understood my requirements and helped me find a great rental in Pune within my budget."
    },
    {
        name: "Sneha Patel",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        text:
            "Very professional and responsive team. They made the entire buying process stress-free and provided valuable advice at every step."
    },
    {
        name: "Vikram Iyer",
        role: "Entrepreneur",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        text:
            "I was able to invest in a property in Hyderabad with ease. Their expertise and local knowledge are unmatched. Thank you for the support!"
    },
    {
        name: "Kavya Reddy",
        role: "Doctor",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        text:
            "PropArk helped me find the perfect clinic space in Chennai. Their understanding of commercial properties and patient requirements was excellent!"
    },
    {
        name: "Arjun Singh",
        role: "Business Analyst",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        text:
            "Being an analyst, I appreciate data-driven decisions. PropArk provided comprehensive market analysis that helped me make the right investment in Gurgaon."
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
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6 sm:px-16 text-center font-sans relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20 translate-x-32 translate-y-32"></div>

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                        What Our <span className="text-blue-600">Clients</span> Say
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover why thousands of customers trust PropArk for their real estate needs
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-3xl shadow-xl px-10 py-12 border border-gray-100 relative overflow-hidden"
                        >
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                            {/* Quote background decoration */}
                            <div className="absolute top-4 right-6 text-blue-50 text-6xl opacity-50">
                                <FaQuoteLeft />
                            </div>

                            <FaQuoteLeft className="text-3xl text-blue-600 mb-6 mx-auto relative z-10" />
                            <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium relative z-10 max-w-2xl mx-auto">
                                "{testimonials[current].text}"
                            </p>
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg bg-white p-1">
                                        <img
                                            src={testimonials[current].image}
                                            alt={testimonials[current].name}
                                            className="w-full h-full rounded-full object-cover object-center"
                                            style={{
                                                filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
                                            }}
                                        />
                                    </div>
                                    {/* Verified badge */}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="font-semibold text-gray-800 text-lg">
                                    {testimonials[current].name}
                                </p>
                                <p className="text-sm text-blue-600 font-medium">{testimonials[current].role}</p>

                                {/* Rating Stars */}
                                <div className="flex mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-10 px-6 sm:px-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={prevTestimonial}
                            className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <FaChevronLeft />
                            Previous
                        </motion.button>

                        {/* Dots indicator */}
                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={nextTestimonial}
                            className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            Next <FaChevronRight />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsPage;