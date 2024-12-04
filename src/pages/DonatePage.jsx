import { useState } from "react";

const DonatePage = ({ campaign }) => {
    const [donationAmount, setDonationAmount] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleDonation = (e) => {
        e.preventDefault();

        if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        // Process the donation (e.g., send to server or update state)
        setSuccessMessage(
            `Thank you for donating $${donationAmount}! Your support is appreciated.`
        );
        setDonationAmount("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">
                    Support {campaign.title}
                </h1>

                {campaign.thumbnail && (
                    <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="object-cover w-full h-48 mb-6 rounded-lg"
                    />
                )}

                <p className="mb-4 text-gray-700">{campaign.description}</p>
                <p className="mb-4 text-gray-600">
                    <strong>Goal:</strong> ${campaign.goal}
                </p>
                <p className="mb-6 text-gray-600">
                    <strong>Raised so far:</strong> ${campaign.raised}
                </p>

                <form onSubmit={handleDonation} className="space-y-4">
                    <div>
                        <label
                            htmlFor="donationAmount"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Enter Donation Amount
                        </label>
                        <input
                            type="number"
                            id="donationAmount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="$10, $20, $50..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Donate Now
                    </button>
                </form>

                {successMessage && (
                    <div className="p-4 mt-6 text-green-700 bg-green-100 border-l-4 border-green-500 rounded-lg">
                        <p>{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonatePage;
