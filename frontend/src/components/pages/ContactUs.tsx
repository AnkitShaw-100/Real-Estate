import { motion } from "framer-motion";
import image6 from "../../assets/exterior/image6.jpg";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row transform -translate-y-[8vh]"
            >
                {/* Left: Contact Form */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">
                        We'd love to hear from you. Send us a message and we’ll get back to you as soon as possible.
                    </p>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Your full name"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Write your message here..."
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Right: Image */}
                <div className="hidden lg:block lg:w-1/2">
                    <img
                        src={image6}
                        alt="Contact us"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;
