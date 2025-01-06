import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";

const MyDonationsPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user.email) {
            setError("User not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        const fetchDonations = async () => {
            try {
                const response = await fetch(
                    `https://crowdcube-server-fawn.vercel.app/donations?email=${user.email}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch donations");
                }
                const data = await response.json();
                setDonations(data);
            } catch (error) {
                setError("Failed to load donations.");
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, [user.email]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div
            className={`py-10 px-12 mx-auto h-screen font-nunito ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900"
            }`}
        >
            <h1 className="mb-6 text-2xl font-bold text-center">
                <Typewriter
                    words={["My Donations"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={1500}
                />
            </h1>

            {donations.length === 0 ? (
                <p className="text-center text-gray-500">No donations found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {donations.map((donation) => (
                        <div
                            key={donation.id}
                            className={`p-4 border rounded-md ${
                                theme === "dark"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-900"
                            }`}
                        >
                            <h3 className="text-lg font-bold">
                                {donation.campaignTitle}
                            </h3>
                            <p>
                                Donated:{" "}
                                <span className="font-semibold">
                                    ${donation.amount}
                                </span>
                            </p>
                            <p>
                                Date:{" "}
                                {new Date(donation.date).toLocaleDateString()}
                            </p>
                            <Link
                                to={`/campaigns/${donation.campaignId}`}
                                className="mt-2 text-right text-blue-500 underline"
                            >
                                Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDonationsPage;
