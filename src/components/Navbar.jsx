import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
    const { user, Logout } = useContext(AuthContext);

    const links = (
        <div className="flex items-center gap-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/campaigns">All Campaigns</NavLink>
            <NavLink to="/addCampaign">Add New Campaign</NavLink>
            <NavLink to="/myCampaign">My Campaign</NavLink>
            <NavLink to="/myDonations">My Donations</NavLink>
        </div>
    );

    return (
        <nav className="p-4 text-white font-nunito">
            <div className="container flex items-center justify-between mx-auto">
                {/* Website Logo/Name */}
                <Link to="/" className="text-2xl font-bold">
                    CrowdCube
                </Link>

                {/* Navigation Links */}
                <ul className="flex space-x-4">
                    <li>{links}</li>

                    {user && (
                        <>
                            <li>
                                <NavLink
                                    to="/addCampaign"
                                    className={({ isActive }) =>
                                        `hover:underline ${
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
                                        `hover:underline ${
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
                                        `hover:underline ${
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

                {/* Authentication Section */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="relative">
                            <img
                                src={user.photoURL || "/default-avatar.png"}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                title={user.displayName || "User"}
                            />
                            <button
                                onClick={Logout}
                                className="px-4 py-2 ml-4 bg-red-500 rounded hover:bg-red-600"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-blue-500 bg-white rounded hover:bg-gray-200"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-blue-500 bg-white rounded hover:bg-gray-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
