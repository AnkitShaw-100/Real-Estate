import React from "react";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="w-full bg-gray-50 font-sans">
            {/* Hero Section */}
            <section className="relative px-6 sm:px-10 lg:px-20 pt-20 pb-32 bg-cover bg-center rounded-b-[3rem]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1500&q=80')" }}>
                <div className="max-w-6xl mx-auto text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl font-bold mb-4 leading-snug drop-shadow-lg"
                    >
                        Buy and Sell, Rent, <br className="hidden sm:block" /> Cooperate, Property
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg mb-10 opacity-90 drop-shadow-md"
                    >
                        Choose a property service and explore
                    </motion.p>

                    {/* Search Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl mx-auto flex flex-wrap gap-6 items-center justify-between"
                    >
                        <select className="flex-1 min-w-[140px] border border-gray-300 px-5 py-4 rounded-xl text-gray-700 bg-white font-medium shadow-md">
                            <option>Buy</option>
                            <option>Sell</option>
                            <option>Rent</option>
                        </select>

                        <input
                            type="text"
                            placeholder="City or Full Address"
                            className="flex-1 min-w-[200px] px-5 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-md"
                        />

                        <button className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg">
                            Search
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-20 flex flex-col md:flex-row justify-between items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center md:text-left max-w-md"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        We Are Spread All <br /> Over the Archipelago.
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Serving 50+ cities, 120k+ listings, and thousands of happy customers with the best real estate services.
                    </p>
                    <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg">
                        See Our Projects
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-6 text-center"
                >
                    <div>
                        <p className="text-3xl font-bold text-blue-600">300K+</p>
                        <p className="text-gray-600">Property Searches</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-blue-600">48+</p>
                        <p className="text-gray-600">Cities</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-blue-600">52K+</p>
                        <p className="text-gray-600">Customers</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-blue-600">125K+</p>
                        <p className="text-gray-600">Listings Posted</p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
