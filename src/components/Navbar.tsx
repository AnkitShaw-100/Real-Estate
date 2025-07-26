import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = [
        { text: 'Home', path: '/' },
        { text: 'Property', path: '/property' },
        { text: 'Services', path: '/services' },
        { text: 'Contact', path: '/contact' },
        { text: 'About Us', path: '/about' }
    ];

    return (
        <nav className="bg-slate-200 shadow-md">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-black text-xl sm:text-2xl font-bold whitespace-nowrap">
                    Urban<span className="text-blue-800">Nest</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium text-sm sm:text-base">
                    {navLinks.map((link) => (
                        <Link
                            key={link.text}
                            to={link.path}
                            className="relative cursor-pointer hover:font-semibold hover:text-blue-800 after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-blue-800 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="hidden md:flex space-x-2 sm:space-x-4">
                    <Link
                        to="/signup/buyer"
                        className="text-blue-800 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded bg-slate-200 font-medium hover:bg-slate-300 inline-block"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/signup/buyer"
                        className="text-white bg-blue-900 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded font-semibold hover:bg-blue-800 inline-block"
                    >
                        Buy now
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-2xl text-slate-800 hover:text-blue-800 focus:outline-none"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-slate-50 border-t border-slate-200">
                    {navLinks.map((link) => (
                        <Link
                            key={link.text}
                            to={link.path}
                            className="block text-slate-800 font-medium text-base cursor-pointer hover:text-blue-800"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.text}
                        </Link>
                    ))}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
                        <Link
                            to="/signup/buyer"
                            className="text-blue-800 px-4 py-2 rounded bg-slate-200 font-medium hover:bg-slate-300 text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup/buyer"
                            className="text-white bg-blue-900 px-4 py-2 rounded font-semibold hover:bg-blue-800 text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                            Buy now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
