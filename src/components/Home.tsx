import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import homePage from "../assets/homePage.jpg";

type DropdownProps = {
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
};

const Dropdown = ({ options, selected, setSelected }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full sm:w-auto flex-1 min-w-[140px]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center border border-gray-300 px-5 py-4 rounded-xl bg-white text-gray-700 font-medium shadow-md focus:outline-none"
            >
                {selected}
                <FaChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                    {options.map((option: string) => (
                        <div
                            key={option}
                            onClick={() => {
                                setSelected(option);
                                setOpen(false);
                            }}
                            className="px-5 py-3 cursor-pointer hover:bg-gray-100 text-gray-700"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Home = () => {
    const [selectedOption, setSelectedOption] = useState("Buy");

    return (
        <div className="w-full bg-gray-50 font-sans">
            {/* Hero Section */}
            <section
                className="relative px-4 sm:px-8 lg:px-20 pt-20 pb-32 bg-cover bg-center rounded-b-[3rem]"
                style={{
                    backgroundImage: `url(${homePage})`,
                }}
            >
                <div className="max-w-6xl mx-auto text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug drop-shadow-lg"
                    >
                        Buy and Sell, Rent, <br className="hidden sm:block" />
                        Cooperate, Property
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-base sm:text-lg mb-10 opacity-90 drop-shadow-md"
                    >
                        Choose a property service and explore
                    </motion.p>

                    {/* Search Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-stretch justify-between"
                    >
                        {/* Custom Dropdown */}
                        <Dropdown
                            options={["Buy", "Sell", "Rent"]}
                            selected={selectedOption}
                            setSelected={setSelectedOption}
                        />

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="City or Full Address"
                            className="flex-1 min-w-[200px] px-5 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-md focus:outline-none"
                        />

                        {/* Search Button */}
                        <button className="w-full sm:w-auto px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg">
                            Search
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 py-20 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-6 text-center md:text-left"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug">
                        We Are Spread All <br className="hidden sm:block" />
                        Over the Archipelago.
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Serving 50+ cities, 120k+ listings, and thousands of happy customers with the best real estate services.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-md"
                    >
                        See Our Projects
                    </motion.button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-6 text-center"
                >
                    {[
                        { value: "300K+", label: "Property Searches" },
                        { value: "48+", label: "Cities" },
                        { value: "52K+", label: "Customers" },
                        { value: "125K+", label: "Listings Posted" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-4 bg-white rounded-xl shadow hover:shadow-lg"
                        >
                            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                            <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

        </div>
    );
};

export default Home;
