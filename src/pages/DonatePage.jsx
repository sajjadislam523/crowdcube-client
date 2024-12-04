import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const DonatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const campaign = location.state?.campaign;

    const [amount, setAmount] = useState("");
    const [contributor, setContributor] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    if (!campaign) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-red-500">
                    No campaign data available.
                </p>
            </div>
        );
    }

    const handleDonation = async (e) => {
        e.preventDefault();

        if (!amount || !contributor) {
            setError("All fields are required.");
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "All fields are required.",
            });
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/campaigns/${campaign._id}/donate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: parseFloat(amount),
                        contributor,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to process donation.");
            }

            const updatedCampaign = await response.json();
            console.log("Donation Successful:", updatedCampaign);
            setSuccess(true);
            setError(null);

            Swal.fire({
                icon: "success",
                title: "Thank You!",
                text: "Your donation was successful!",
            });
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="max-w-3xl px-4 py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
                Donate to {campaign.title}
            </h1>

            {success ? (
                <div className="p-4 text-green-700 bg-green-100 border border-green-400 rounded-md">
                    Thank you for your generous donation!
                </div>
            ) : (
                <form onSubmit={handleDonation} className="space-y-6">
                    {error && (
                        <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="contributor"
                            className="block mb-2 text-sm font-medium text-gray-600"
                        >
                            Your Name
                        </label>
                        <input
                            id="contributor"
                            type="text"
                            value={contributor}
                            onChange={(e) => setContributor(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="amount"
                            className="block mb-2 text-sm font-medium text-gray-600"
                        >
                            Donation Amount ($)
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Enter amount"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Donate
                    </button>
                </form>
            )}

            <button
                className="mt-4 text-blue-500 underline hover:text-blue-700"
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
        </div>
    );
};

export default DonatePage;
