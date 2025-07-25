import React from "react";
import { motion } from "framer-motion";

const benefits = [
    {
        number: "01.",
        title: "Access to Exclusive Projects",
        desc: "Monitor various exclusive project listings from trusted vendors, enabling them to be interesting for potential buyers."
    },
    {
        number: "02.",
        title: "Personal Data Privacy is Safe",
        desc: "All transaction data of you and your buyers, both privacy and their legal support and access methods, must be kept safe."
    },
    {
        number: "03.",
        title: "Faster and Easier Transactions",
        desc: "You can search for property types in easy features. Transactions are faster and you can get commissions easily."
    }
];

const companyLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Brookfield_Asset_Management_logo.svg/512px-Brookfield_Asset_Management_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/JLL_logo.svg/512px-JLL_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Logo_Park_Hotels_&_Resorts.svg/512px-Logo_Park_Hotels_&_Resorts.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Prologis_logo.svg/512px-Prologis_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Regency_Centers_logo.svg/512px-Regency_Centers_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Weyerhaeuser_logo.svg/512px-Weyerhaeuser_logo.svg.png"
];

const Benefits = () => {
    return (
        <section className="w-full bg-gray-50 px-6 sm:px-16 py-16 font-sans">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-bold text-gray-800"
                >
                    Benefit of Choosing Us
                </motion.h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto text-center mb-12"
            >
                {benefits.map((benefit, index) => (
                    <div key={index} className="px-6">
                        <p className="text-2xl font-bold text-blue-600 mb-2">{benefit.number}</p>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-20"
            >
                <img
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1500&q=80"
                    alt="Modern Building"
                    className="w-full h-64 object-cover"
                />
            </motion.div>

            {/* Infinite Logo Carousel */}
            <div className="overflow-hidden whitespace-nowrap py-10 bg-white">
                <div className="inline-block animate-marquee space-x-16">
                    {companyLogos.concat(companyLogos).map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt="Company Logo"
                            className="inline h-16 object-contain mx-4"
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default Benefits;
