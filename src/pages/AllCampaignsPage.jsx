import { useLoaderData } from "react-router-dom";
import CampaignCard from "./CampaignCard";
import { Typewriter } from "react-simple-typewriter";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const AllCampaignsPage = () => {
    const campaigns = useLoaderData();
    const [sortedCampaigns, setSortedCampaigns] = useState(campaigns);
    const [sortOrder, setSortOrder] = useState("asc");
    const { theme } = useContext(ThemeContext);

    const handleSort = (order) => {
        const sorted = [...sortedCampaigns].sort((a, b) => {
            if (order === "asc") {
                return a.minimumDonation - b.minimumDonation;
            } else {
                return b.minimumDonation - a.minimumDonation;
            }
        });
        setSortOrder(order);
        setSortedCampaigns(sorted);
    };

    return (
        <div className="px-6 py-8 all-campaigns">
            <h1 className="mb-8 text-3xl font-bold text-center font-nunito">
                <Typewriter
                    words={["All Campaigns"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={1500}
                />
            </h1>

            <div className="mb-4 text-center">
                <p>
                    {" "}
                    <strong>Order:</strong>{" "}
                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                </p>
            </div>

            <div className="mb-4 text-center">
                <button
                    className={`px-4 py-2 ml-4 border rounded-full font-nunito border-gray-500 ${
                        theme === "dark" ? "text-white" : "text-black"
                    } hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white transition duration-300`}
                    onClick={() => handleSort("asc")}
                >
                    Ascending
                </button>
                <button
                    className={`px-4 py-2 ml-4 border rounded-full font-nunito border-gray-500 ${
                        theme === "dark" ? "text-white" : "text-black"
                    } hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white transition duration-300`}
                    onClick={() => handleSort("desc")}
                >
                    Descending
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCampaigns.map((campaign) => (
                    <CampaignCard key={campaign._id} campaigns={campaign} />
                ))}
            </div>
        </div>
    );
};

export default AllCampaignsPage;
