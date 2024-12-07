import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { Typewriter } from "react-simple-typewriter";

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
                    `http://localhost:5000/donations?email=${user.email}`
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
        return <p className="text-center text-gray-500">Loading...</p>;
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
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse border-gray-300">
                        <thead>
                            <tr
                                className={`${
                                    theme === "dark"
                                        ? "bg-gray-700"
                                        : "bg-gray-200"
                                }`}
                            >
                                <th
                                    className={`px-4 py-2 border border-gray-300 ${
                                        theme === "dark"
                                            ? "text-gray-300"
                                            : "text-gray-800"
                                    }`}
                                >
                                    Campaign Title
                                </th>
                                <th
                                    className={`px-4 py-2 border border-gray-300 ${
                                        theme === "dark"
                                            ? "text-gray-300"
                                            : "text-gray-800"
                                    }`}
                                >
                                    Donated
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        theme === "dark"
                                            ? "bg-gray-800"
                                            : "bg-white"
                                    } `}
                                >
                                    <td
                                        className={`px-4 py-2 border border-gray-300 ${
                                            theme === "dark"
                                                ? "text-gray-300"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {donation.campaignTitle}
                                    </td>
                                    <td
                                        className={`px-4 py-2 border border-gray-300 ${
                                            theme === "dark"
                                                ? "text-gray-300"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        ${donation.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyDonationsPage;
