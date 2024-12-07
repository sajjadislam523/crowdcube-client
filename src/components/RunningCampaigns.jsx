import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { ThemeContext } from "../context/ThemeProvider";
import { Typewriter } from "react-simple-typewriter";

const RunningCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch(
                    "https://crowdcube-server-fawn.vercel.app/campaigns"
                );
                const data = await response.json();
                const runningCampaigns = data.filter(
                    (campaign) => new Date(campaign.expiredDate) > new Date()
                );
                setCampaigns(runningCampaigns.slice(0, 6));
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <section
            className={`px-4 py-8 ${
                theme === "light" ? "bg-gray-100" : "bg-gray-800 text-white"
            }`}
        >
            <div className="container mx-auto">
                <h2
                    className={`mb-6 text-3xl font-nunito font-bold text-center ${
                        theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                >
                    <Typewriter
                        words={["Running Campaigns"]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={60}
                        delaySpeed={1500}
                    />
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign._id}
                            className={`overflow-hidden border rounded-lg shadow-md ${
                                theme === "light"
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-700 border-gray-600"
                            }`}
                        >
                            <img
                                src={campaign.thumbnail}
                                alt={campaign.title}
                                className="object-cover w-full h-40"
                            />
                            <div className="p-4">
                                <h3
                                    className={`mb-2 text-xl font-semibold ${
                                        theme === "light"
                                            ? "text-gray-800"
                                            : "text-gray-100"
                                    }`}
                                >
                                    {campaign.title}
                                </h3>
                                <p
                                    className={`mb-3 text-sm ${
                                        theme === "light"
                                            ? "text-gray-600"
                                            : "text-gray-300"
                                    }`}
                                >
                                    {campaign.description.slice(0, 100)}...
                                </p>
                                <p
                                    className={`text-sm ${
                                        theme === "light"
                                            ? "text-gray-600"
                                            : "text-gray-300"
                                    }`}
                                >
                                    <strong>Goal:</strong> ${campaign.goal}
                                </p>
                                <p
                                    className={`text-sm ${
                                        theme === "light"
                                            ? "text-gray-600"
                                            : "text-gray-300"
                                    }`}
                                >
                                    <strong>Raised:</strong> ${campaign.raised}
                                </p>
                                <p
                                    className={`mt-2 text-xs ${
                                        theme === "light"
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <strong>Expires:</strong>{" "}
                                    {new Date(
                                        campaign.expiredDate
                                    ).toLocaleDateString()}
                                </p>
                                <Link
                                    to={`/campaigns/${campaign._id}`}
                                    className={`inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition rounded ${
                                        theme === "light"
                                            ? "bg-blue-500 hover:bg-blue-600"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    See More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RunningCampaigns;
