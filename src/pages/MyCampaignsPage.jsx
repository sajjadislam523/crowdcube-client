import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { ThemeContext } from "../context/ThemeProvider";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const MyCampaignPage = () => {
    const { user } = useContext(AuthContext);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchUserCampaigns = async () => {
            try {
                const response = await fetch(
                    `https://crowdcube-server-fawn.vercel.app/campaigns?email=${user.email}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch campaigns");
                }

                const data = await response.json();
                const userCampaigns = data.filter(
                    (campaign) => campaign.creator === user.email
                );
                setCampaigns(userCampaigns);
            } catch (error) {
                console.error("Error fetching campaigns:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCampaigns();
    }, [user]);

    const handleDelete = async (id) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this campaign?"
        );

        if (confirmation) {
            try {
                const response = await fetch(
                    `https://crowdcube-server-fawn.vercel.app/campaigns/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                if (response.ok) {
                    setCampaigns(
                        campaigns.filter((campaign) => campaign._id !== id)
                    );
                } else {
                    console.error("Failed to delete campaign");
                }
            } catch (error) {
                console.error("Error deleting campaign:", error.message);
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div
            className={`py-12 px-6 font-nunito h-screen
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900"
            }`}
        >
            <h1 className="mb-8 text-3xl font-bold text-center">
                <Typewriter
                    words={["My Campaigns"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={1500}
                />
            </h1>
            {campaigns.length === 0 ? (
                <p className="text-lg text-center">
                    You have not added any campaigns yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign._id}
                            className={`p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                                theme === "dark"
                                    ? "bg-gray-800 border-gray-700 text-gray-300"
                                    : "bg-white border-gray-300 text-gray-900"
                            }`}
                        >
                            <h2 className="mb-3 text-2xl font-semibold">
                                {campaign.title}
                            </h2>
                            <Fade duration={800} delay={100} cascade>
                                <p
                                    className={`mb-4 text-sm ${
                                        theme === "dark"
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {campaign.description}
                                </p>
                            </Fade>
                            <div className="flex justify-between mt-4">
                                <Link
                                    to={`/updateCampaign/${campaign._id}`}
                                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
                                        theme === "dark"
                                            ? "bg-blue-600"
                                            : "bg-blue-500"
                                    }`}
                                >
                                    Update
                                </Link>
                                <button
                                    onClick={() => handleDelete(campaign._id)}
                                    className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 ${
                                        theme === "dark"
                                            ? "bg-red-600"
                                            : "bg-red-500"
                                    }`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCampaignPage;
