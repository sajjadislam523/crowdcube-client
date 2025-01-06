import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { ThemeContext } from "../context/ThemeProvider.jsx";

export default function UpdateCampaignPage() {
    // Fetch campaign data from loader
    const campaign = useLoaderData();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: campaign?.title || "",
        thumbnail: campaign?.thumbnail || "",
        type: campaign?.type || "",
        description: campaign?.description || "",
        minimumDonation: campaign?.minimumDonation || "",
        expiredDate: campaign?.expiredDate || "",
        goal: campaign?.goal || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://crowdcube-server-fawn.vercel.app/campaigns/${campaign._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Campaign updated successfully!",
                    icon: "success",
                    confirmButtonText: "Done",
                });
                navigate("/campaigns");
            } else {
                throw new Error("Failed to update campaign");
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "Retry",
            });
        }
    };

    return (
        <div
            className={` py-10 px-8 font-nunito ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
        >
            <h1
                className={`mb-6 text-xl font-bold text-center ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
                <Typewriter
                    words={["Update Campaign"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={1500}
                />
            </h1>
            <form
                onSubmit={handleSubmit}
                className={`max-w-lg p-6 mx-auto rounded shadow-md ${
                    theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
            >
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Campaign Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Thumbnail URL:
                    </label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Type:
                    </label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Minimum Donation Amount:
                    </label>
                    <input
                        type="number"
                        name="minimumDonation"
                        value={formData.minimumDonation || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Expired Date:
                    </label>
                    <input
                        type="date"
                        name="expiredDate"
                        value={formData.expiredDate || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className={`block mb-2 font-bold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        Goal Amount:
                    </label>
                    <input
                        type="number"
                        name="goal"
                        value={formData.goal || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${
                            theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "border-gray-300 text-gray-900"
                        }`}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full p-2 rounded hover:bg-blue-600 ${
                        theme === "dark"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    Update Campaign
                </button>
            </form>
        </div>
    );
}
