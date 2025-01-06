import { useContext } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import icon from "../assets/icon/favicon.png";
import { ThemeContext } from "../context/ThemeProvider";

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <footer
            className={`py-10 px-6 ${
                theme === "light"
                    ? "bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-gray-800"
                    : "bg-gray-900 text-gray-300"
            }`}
        >
            <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-3">
                {/* About Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img
                            src={icon}
                            className="inline w-8 h-8 rounded-full"
                            alt=""
                        />
                        <h3 className="text-2xl font-bold font-nunito">
                            CrowdCube
                        </h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Our platform empowers individuals and communities to
                        create impactful donation campaigns. Join us in
                        fostering change by connecting donors with meaningful
                        causes.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/campaigns" className="hover:underline">
                                Explore Campaigns
                            </a>
                        </li>
                        <li>
                            <a
                                href="/start-campaign"
                                className="hover:underline"
                            >
                                Start a Campaign
                            </a>
                        </li>
                        <li>
                            <a
                                href="/success-stories"
                                className="hover:underline"
                            >
                                Success Stories
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-xl font-semibold">
                        Stay Connected
                    </h3>
                    <p className="mb-4 text-sm">
                        Follow us on social media for updates, success stories,
                        and new campaigns.
                    </p>
                    <div className="flex space-x-4 text-2xl">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-8 text-sm text-center border-t">
                <p>
                    &copy; {new Date().getFullYear()} EmpowerChange
                    Crowdfunding. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
