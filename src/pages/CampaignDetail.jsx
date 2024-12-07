import { useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";

const CampaignDetail = () => {
    const campaign = useLoaderData();
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
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

            const response = await fetch(
                "https://crowdcube-server-fawn.vercel.app/donate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(donationDetails),
                }
            );

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
        <div className="px-4 py-6">
            <div
                className={`flex flex-col lg:flex-row gap-6 overflow-hidden border rounded-lg shadow-md ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
                {thumbnail && (
                    <div className="w-full lg:w-1/2">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-64 rounded-md sm:h-full"
                        />
                    </div>
                )}
                <div className="flex flex-col justify-between flex-grow p-6 space-y-6">
                    <div>
                        <h1
                            className={`mb-4 text-3xl font-bold ${
                                theme === "dark"
                                    ? "text-gray-100"
                                    : "text-gray-800"
                            } sm:text-4xl`}
                        >
                            <Typewriter
                                words={[title]}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={80}
                                deleteSpeed={60}
                                delaySpeed={1500}
                            />
                        </h1>
                        <Fade duration={800} delay={200} cascade>
                            <p
                                className={`mb-6 text-md sm:text-lg ${
                                    theme === "dark"
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                {description}
                            </p>
                        </Fade>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div
                            className={`p-4 rounded-lg ${
                                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                            }`}
                        >
                            <p
                                className={`mb-2 text-sm font-semibold ${
                                    theme === "dark"
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                }`}
                            >
                                Goal
                            </p>
                            <p
                                className={`text-lg font-bold ${
                                    theme === "dark"
                                        ? "text-green-400"
                                        : "text-green-500"
                                } sm:text-xl`}
                            >
                                ${goal}
                            </p>
                        </div>
                        <div
                            className={`p-4 rounded-lg ${
                                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                            }`}
                        >
                            <p
                                className={`mb-2 text-sm font-semibold ${
                                    theme === "dark"
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                }`}
                            >
                                Raised
                            </p>
                            <p
                                className={`text-lg font-bold ${
                                    theme === "dark"
                                        ? "text-blue-400"
                                        : "text-blue-500"
                                } sm:text-xl`}
                            >
                                ${raisedAmount}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`p-4 rounded-lg ${
                            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        }`}
                    >
                        <p
                            className={`mb-2 text-sm font-semibold ${
                                theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                            }`}
                        >
                            <strong>Creator:</strong> {creator}
                        </p>
                        <p
                            className={`text-sm ${
                                theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                            }`}
                        >
                            <strong>Expiration Date:</strong>{" "}
                            {new Date(expiredDate).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        className={`w-full px-4 py-2 text-sm font-bold text-white transition duration-300 rounded-lg sm:w-auto sm:text-base ${
                            new Date(expiredDate) < new Date()
                                ? `bg-gray-600 cursor-not-allowed ${
                                      theme === "dark" ? "dark:bg-gray-600" : ""
                                  }`
                                : `bg-blue-500 hover:bg-blue-600 ${
                                      theme === "dark"
                                          ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                                          : ""
                                  }`
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
