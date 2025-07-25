import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white px-6 sm:px-16 py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12">
                {/* Left Column */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">PropArk.</h2>
                    <p className="mb-4 text-sm text-gray-200">
                        We are a proper place of value, convenience, efficiency, and an automated property solution.
                    </p>
                    <p className="text-sm mb-1">📞 021-987-654</p>
                    <p className="text-sm mb-4">📧 propark@domain.com</p>
                    <div className="flex space-x-4 text-lg">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm text-gray-200 mb-4">
                        Be the first to know about discounts, offers and events. Ready in your inbox, unsubscribe whenever you like.
                    </p>
                    {/* <div className="flex items-center max-w-md space-x-2"> */}
                    {/* <Input placeholder="Enter your email" className="rounded-md" />
            <Button className="bg-green-500 hover:bg-green-600 text-white">Submit</Button>
          </div> */}
                </div>
            </div>

            {/* Bottom Links */}
            <div className="border-t border-blue-700 mt-10 pt-6 text-center text-sm text-gray-300 space-y-2">
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#">About</a>
                    <a href="#">Jobs</a>
                    <a href="#">Blog</a>
                    <a href="#">Press</a>
                    <a href="#">Help</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                </div>
                <p className="pt-4">&copy; 2025 PropArk. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
