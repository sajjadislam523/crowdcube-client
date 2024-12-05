import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCampaignPage = () => {
    const { user } = useContext(AuthContext);
    const campaign = useLoaderData();
    const [formData, setFormData] = useState(campaign);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/campaign/${campaign._id}`,
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
                navigate("/campaigns"); // Redirect to a list of campaigns or home
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
        <div className="container py-10 mx-auto">
            <h1 className="mb-6 text-xl font-bold text-center">
                Update Campaign
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg p-6 mx-auto bg-white rounded shadow-md"
            >
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Campaign Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Thumbnail URL:
                    </label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Type:
                    </label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Minimum Donation Amount:
                    </label>
                    <input
                        type="number"
                        name="minimumDonation"
                        value={formData.minimumDonation}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Expired Date:
                    </label>
                    <input
                        type="date"
                        name="expiredDate"
                        value={formData.expiredDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">
                        Creator Info:
                    </label>
                    <input
                        type="text"
                        name="creator"
                        value={user.email || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        readOnly={true}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Update Campaign
                </button>
            </form>
        </div>
    );
};

export default UpdateCampaignPage;
