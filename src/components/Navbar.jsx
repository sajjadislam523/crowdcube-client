import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navigation links
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/campaigns", label: "All Campaigns" },
        { to: "/addCampaign", label: "Add New Campaign" },
        { to: "/myCampaign", label: "My Campaigns" },
        { to: "/myDonations", label: "My Donations" },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 shadow-lg font-nunito ${
                theme === "light"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-gray-800 text-gray-100"
            }`}
        >
            <div className="container flex items-center justify-between p-4 mx-auto">
                <Link to="/" className="text-3xl font-extrabold tracking-wider">
                    CrowdCube
                </Link>

                <ul className="items-center hidden space-x-6 transition-all duration-300 lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `transition duration-300 hover:text-yellow-200 ${
                                        isActive ? "underline" : ""
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 text-sm font-bold transition duration-300 rounded-md ${
                            theme === "light"
                                ? "text-black bg-gray-200 hover:bg-gray-300"
                                : "text-white bg-gray-600 hover:bg-gray-700"
                        }`}
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {user ? (
                        <img
                            src={user.photoURL || ""}
                            alt="User Avatar"
                            className="w-8 h-8 border-2 border-white rounded-full shadow cursor-pointer"
                            title={user.displayName}
                        />
                    ) : null}
                    <div className="hidden gap-2 md:flex">
                        {user ? (
                            <button
                                onClick={logOut}
                                className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-md shadow hover:bg-red-600"
                            >
                                Log out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-bold text-blue-600 bg-white rounded-md shadow hover:bg-gray-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-bold text-blue-600 bg-white rounded-md shadow hover:bg-gray-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="z-10 lg:hidden">
                        <button onClick={handleMenuToggle} className="text-xl">
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out lg:hidden ${
                    isMenuOpen ? "translate-y-0" : "-translate-y-full"
                } ${
                    theme === "light"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-800 text-gray-100"
                }`}
            >
                <ul className="p-4 space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `block transition duration-300 ${
                                        isActive
                                            ? "underline"
                                            : theme === "light"
                                            ? "hover:text-gray-600"
                                            : "hover:text-yellow-200"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}

                    <div className="flex gap-4 md:hidden">
                        {user ? (
                            <button
                                onClick={logOut}
                                className={`w-full px-4 py-2 text-sm font-bold rounded-md shadow ${
                                    theme === "light"
                                        ? "text-white bg-red-500 hover:bg-red-600"
                                        : "text-gray-100 bg-red-700 hover:bg-red-800"
                                }`}
                            >
                                Log out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`block w-full px-4 py-2 text-sm font-bold rounded-md shadow ${
                                        theme === "light"
                                            ? "text-blue-600 bg-white hover:bg-gray-200"
                                            : "text-blue-200 bg-gray-700 hover:bg-gray-600"
                                    }`}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className={`block w-full px-4 py-2 text-sm font-bold rounded-md shadow ${
                                        theme === "light"
                                            ? "text-blue-600 bg-white hover:bg-gray-200"
                                            : "text-blue-200 bg-gray-700 hover:bg-gray-600"
                                    }`}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
