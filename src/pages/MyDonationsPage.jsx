import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const MyDonationsPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="container py-10 mx-auto">
            <h1 className="mb-6 text-2xl font-bold text-center">
                My Donations
            </h1>

            {donations.length === 0 ? (
                <p className="text-center text-gray-500">No donations found.</p>
            ) : (
                <table className="w-full border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">
                                Campaign Title
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                                Total Raised
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => (
                            <tr key={index} className="text-center">
                                <td className="px-4 py-2 border border-gray-300">
                                    {donation.campaignTitle}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    ${donation.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyDonationsPage;
