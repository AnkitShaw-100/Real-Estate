import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = ['Home', 'Product', 'Services', 'Contact', 'About Us'];

    return (
        <nav className="bg-slate-100 shadow-md">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20 py-4 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-black text-xl sm:text-2xl font-bold whitespace-nowrap">
                    Urban<span className="text-blue-500">Nest</span>
                </h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium text-sm sm:text-base">
                    {navLinks.map((text) => (
                        <p
                            key={text}
                            className="relative cursor-pointer hover:font-semibold hover:text-blue-500 after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                        >
                            {text}
                        </p>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="hidden md:flex space-x-2 sm:space-x-4">
                    <button className="text-blue-500 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded bg-slate-200 font-medium hover:bg-slate-300">
                        Sign In
                    </button>
                    <button className="text-white bg-blue-500 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded font-semibold hover:bg-sky-700">
                        Buy now
                    </button>
                    <button className="w-10 h-10 sm:w-12 sm:h-12 text-slate-700 bg-slate-200 rounded-full flex items-center justify-center text-lg sm:text-xl hover:bg-slate-300">
                        <MdDarkMode />
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-2xl text-slate-800 hover:text-blue-500 focus:outline-none"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-slate-50 border-t border-slate-200">
                    {navLinks.map((text) => (
                        <p
                            key={text}
                            className="text-slate-800 font-medium text-base cursor-pointer hover:text-blue-500"
                        >
                            {text}
                        </p>
                    ))}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
                        <button className="text-blue-500 px-4 py-2 rounded bg-slate-200 font-medium hover:bg-slate-300">
                            Sign In
                        </button>
                        <button className="text-white bg-blue-500 px-4 py-2 rounded font-semibold hover:bg-sky-700">
                            Buy now
                        </button>
                        <button className="w-10 h-10 text-slate-700 bg-slate-200 rounded-full flex items-center justify-center text-xl hover:bg-slate-300 self-start">
                            <MdDarkMode />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
