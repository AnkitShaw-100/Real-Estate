import { motion } from "framer-motion";
import homePage from "../assets/homePage.jpg";
import GodrejLogo from "../assets/companyLogo/GodrejLogo.png";
import LodhaLogo from "../assets/companyLogo/LodhaLogo.png";
import ParkLogo from "../assets/companyLogo/ParkLogo.png";
import PrologisLogo from "../assets/companyLogo/PrologisLogo.png";
import SobhaLogo from "../assets/companyLogo/SobhaLogo.png";

const benefits = [
    {
        number: "01.",
        title: "Access to Exclusive Projects",
        desc: "Monitor various exclusive project listings from trusted vendors, enabling them to be interesting for potential buyers.",
    },
    {
        number: "02.",
        title: "Personal Data Privacy is Safe",
        desc: "All transaction data of you and your buyers, both privacy and their legal support and access methods, must be kept safe.",
    },
    {
        number: "03.",
        title: "Faster and Easier Transactions",
        desc: "You can search for property types in easy features. Transactions are faster and you can get commissions easily.",
    },
];

const companyLogos = [
    GodrejLogo,
    LodhaLogo,
    ParkLogo,
    PrologisLogo,
    SobhaLogo,
];

const Benefits = () => {
    return (
        <section className="w-full bg-gray-50 px-6 sm:px-16 py-20 font-sans">

            {/* Text section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl font-bold text-gray-800"
                >
                    Benefits of Choosing Us
                </motion.h2>
            </div>

            {/* Benefit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border border-gray-100"
                    >
                        <p className="text-3xl font-bold text-blue-900 mb-4">
                            {benefit.number}
                        </p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            {benefit.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl mb-20"
            >
                <img
                    src={homePage}
                    alt="Modern Building"
                    className="w-full h-[480px] sm:h-[550px] object-cover"
                />
            </motion.div>

            {/* Infinite Logo Carousel */}
            <div className="relative bg-white py-10 overflow-hidden">
                <div className="marquee-track flex w-max animate-marquee">
                    {[...companyLogos, ...companyLogos].map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt="Company Logo"
                            className="h-14 sm:h-16 object-contain mx-8"
                        />
                    ))}
                </div>

                <style>{`
                    .marquee-track {
                        display: flex;
                        animation: marquee 20s linear infinite;
                    }
                    @keyframes marquee {
                        0% {
                            transform: translateX(0%);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Benefits;
