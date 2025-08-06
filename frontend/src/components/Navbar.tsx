import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const navLinks = [
        { text: "Home", path: "/" },
        { text: "Services", path: "/services" },
        { text: "About", path: "/about" },
        { text: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-blue-900">
                            RealEstate
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.text}
                                to={link.path}
                                className="text-slate-800 font-medium text-base cursor-pointer hover:text-blue-800 transition"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex space-x-2 sm:space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    Welcome, {user.name}
                                </span>
                                {user.role === 'seller' && (
                                    <Link
                                        to="/seller/dashboard"
                                        className="text-blue-800 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded bg-slate-200 font-medium hover:bg-blue-200 inline-block"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded border border-red-600 font-medium hover:bg-red-50 inline-block"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-blue-800 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded bg-slate-200 font-medium hover:bg-blue-200 inline-block"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/properties"
                                    className="text-white bg-blue-900 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded font-semibold hover:bg-blue-800 inline-block"
                                >
                                    Buy now
                                </Link>
                            </>
                        )}
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
                            {user ? (
                                <>
                                    <span className="text-sm text-gray-600">
                                        Welcome, {user.name}
                                    </span>
                                    {user.role === 'seller' && (
                                        <Link
                                            to="/seller/dashboard"
                                            className="text-blue-800 px-4 py-2 rounded bg-slate-200 font-medium hover:bg-slate-300 text-center"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 px-4 py-2 rounded border border-red-600 font-medium hover:bg-red-50 text-center"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-blue-800 px-4 py-2 rounded bg-slate-200 font-medium hover:bg-slate-300 text-center"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                                            <Link
                            to="/properties"
                            className="text-white bg-blue-900 px-4 py-2 rounded font-semibold hover:bg-blue-800 text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                            Buy now
                        </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
