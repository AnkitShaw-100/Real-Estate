import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white px-6 sm:px-16 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Column 1 - About */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">PropArk.</h2>
                    <p className="text-gray-300 mb-5 text-sm">
                        A proper place of value, convenience, and automated property solutions. We help you find homes effortlessly.
                    </p>
                    <div className="text-sm space-y-1 text-gray-200">
                        <p>📞 021-987-654</p>
                        <p>📧 propark@domain.com</p>
                    </div>
                    <div className="flex space-x-4 mt-4 text-white">
                        <a href="#" className="hover:text-blue-300"><FaFacebookF /></a>
                        <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
                        <a href="#" className="hover:text-blue-300"><FaInstagram /></a>
                    </div>
                </div>

                {/* Column 2 - Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm text-gray-200 space-y-2">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                    </ul>
                </div>

                {/* Column 3 - Newsletter */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                    <p className="text-sm text-gray-300 mb-4">
                        Be the first to hear about offers, new listings, and news. Unsubscribe anytime.
                    </p>
                    <form className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-3 sm:space-y-0">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 decoration-none hover:border-transparent"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-blue-700 mt-14 pt-6 text-center text-sm text-gray-400">
                <p>&copy; 2025 PropArk. All Rights Reserved.</p>
                <div className="flex justify-center flex-wrap mt-3 gap-4 text-xs">
                    <a href="#" className="hover:text-white">About</a>
                    <a href="#" className="hover:text-white">Jobs</a>
                    <a href="#" className="hover:text-white">Help</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
