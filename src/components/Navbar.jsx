import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav
            className={`sticky top-0 z-50 shadow-lg font-nunito ${
                theme === "light"
                    ? " bg-gray-100 text-gray-800"
                    : "bg-gray-800 text-gray-100"
            }`}
        >
            <div className="container flex items-center justify-between p-4 mx-auto">
                <Link to="/" className="text-3xl font-extrabold tracking-wider">
                    CrowdCube
                </Link>

                <ul className="items-center hidden space-x-6 md:flex">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `transition duration-300 hover:text-yellow-200 ${
                                    isActive ? "underline" : ""
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/campaigns"
                            className={({ isActive }) =>
                                `transition duration-300 hover:text-yellow-200 ${
                                    isActive ? "underline" : ""
                                }`
                            }
                        >
                            All Campaigns
                        </NavLink>
                    </li>
                    {user && (
                        <>
                            <li>
                                <NavLink
                                    to="/addCampaign"
                                    className={({ isActive }) =>
                                        `transition duration-300 hover:text-yellow-200 ${
                                            isActive ? "underline" : ""
                                        }`
                                    }
                                >
                                    Add New Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/myCampaign"
                                    className={({ isActive }) =>
                                        `transition duration-300 hover:text-yellow-200 ${
                                            isActive ? "underline" : ""
                                        }`
                                    }
                                >
                                    My Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/myDonations"
                                    className={({ isActive }) =>
                                        `transition duration-300 hover:text-yellow-200 ${
                                            isActive ? "underline" : ""
                                        }`
                                    }
                                >
                                    My Donations
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 text-sm font-bold transition duration-300 rounded-md shadow ${
                            theme === "light"
                                ? "text-black hover:bg-gray-200"
                                : "text-white bg-gray-500 hover:bg-gray-600"
                        }`}
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-3">
                            <img
                                src={user.photoURL || <RxAvatar />}
                                alt="User Avatar"
                                className="w-10 h-10 border-2 border-white rounded-full shadow-lg cursor-pointer"
                                title={user.displayName || "User"}
                            />
                            <button
                                onClick={logOut}
                                className="px-4 py-2 text-sm font-bold text-white transition duration-300 bg-red-500 rounded-md shadow hover:bg-red-600"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-bold text-blue-600 transition duration-300 bg-white rounded-md shadow hover:bg-gray-200"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-bold text-blue-600 transition duration-300 bg-white rounded-md shadow hover:bg-gray-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <button className="block px-4 py-2 transition duration-300 bg-blue-500 rounded shadow md:hidden hover:bg-blue-600">
                    Menu
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
