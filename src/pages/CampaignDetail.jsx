import { useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const CampaignDetail = () => {
    const campaign = useLoaderData();
    const { user } = useContext(AuthContext);
    const [donationAmount, setDonationAmount] = useState(0);
    const [raisedAmount, setRaisedAmount] = useState(0);

    console.log(campaign);

    useEffect(() => {
        if (campaign && campaign.minimumDonation) {
            setDonationAmount(campaign.minimumDonation);
            setRaisedAmount(campaign.raised);
        }
    }, [campaign]);

    if (!campaign) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold text-red-500">
                    Campaign not found.
                </p>
            </div>
        );
    }

    const {
        _id,
        thumbnail,
        title,
        description,
        creator,
        goal,
        expiredDate,
        minimumDonation,
    } = campaign;

    const handleDonateClick = async () => {
        try {
            const loggedInEmail = user.email;
            const loggedInName = user.username;

            const donationDetails = {
                campaignId: _id,
                campaignTitle: title,
                contributorEmail: loggedInEmail,
                contributorName: loggedInName,
                amount: minimumDonation,
            };

            const response = await fetch("http://localhost:5000/donate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donationDetails),
            });

            const resultData = await response.json();

            if (response.ok) {
                setRaisedAmount((prevAmount) => prevAmount + minimumDonation);
                Swal.fire({
                    title: "Donation Successful!",
                    text: `Thank you for your generous donation of $${donationAmount}!`,
                    icon: "success",
                    confirmButtonText: "Close",
                });
            } else {
                throw new Error(resultData.error || "Donation failed");
            }
        } catch (error) {
            console.error("Error processing donation:", error);
            Swal.fire({
                title: "Donation Failed",
                text: "There was an error processing your donation. Please try again.",
                icon: "error",
                confirmButtonText: "Close",
            });
        }
    };

    return (
        <div className="max-w-4xl px-4 py-6 mx-auto">
            <div className="flex flex-col overflow-hidden border rounded-lg shadow-md sm:flex-row">
                {thumbnail && (
                    <div className="flex-shrink-0 p-4">
                        <div className="w-full h-40 sm:h-48 md:h-56">
                            <img
                                src={thumbnail}
                                alt={title}
                                className="object-cover w-full h-full rounded-md"
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-col justify-between flex-grow p-6">
                    <div>
                        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">
                            {title}
                        </h1>
                        <p className="mb-4 text-sm sm:text-base">
                            {description}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-2 rounded-lg">
                            <p className="text-sm font-semibold sm:text-base">
                                Goal
                            </p>
                            <p className="text-base font-bold text-green-500 sm:text-xl">
                                ${goal}
                            </p>
                        </div>
                        <div className="p-2 rounded-lg">
                            <p className="text-base font-semibold sm:text-base">
                                Raised
                            </p>
                            <p className="text-lg font-bold text-blue-500 sm:text-xl">
                                ${raisedAmount}
                            </p>
                        </div>
                    </div>
                    <div className="mb-4 text-sm sm:text-base">
                        <p>
                            <strong>Creator:</strong> {creator}
                        </p>
                        <p>
                            <strong>Expiration Date:</strong>{" "}
                            {new Date(expiredDate).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        className={`w-full px-4 py-2 text-sm font-bold text-white transition duration-300 rounded-lg sm:w-auto sm:text-base ${
                            new Date(expiredDate) < new Date()
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={handleDonateClick}
                        disabled={new Date(expiredDate) < new Date()}
                    >
                        {new Date(expiredDate) < new Date()
                            ? "Campaign Expired"
                            : "Donate Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetail;
