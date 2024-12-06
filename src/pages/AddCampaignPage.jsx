import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

export default function AddCampaign() {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        thumbnail: "",
        type: "",
        description: "",
        minimumDonation: "",
        expiredDate: "",
        goal: "",
        creator: user?.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/campaigns", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Campaign added successfully!",
                    icon: "success",
                    confirmButtonText: "Done",
                });
                setFormData({
                    title: "",
                    thumbnail: "",
                    type: "",
                    description: "",
                    minimumDonation: "",
                    expiredDate: "",
                    goal: "",
                    creator: "",
                });
            } else {
                throw new Error("Failed to add campaign");
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
                Add New Campaign
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
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="" disabled>
                            Select Type
                        </option>
                        <option value="Personal">Personal</option>
                        <option value="Community">Community</option>
                        <option value="Startup">Startup</option>
                        <option value="Creative">Creative</option>
                        <option value="Emergency">Emergency</option>
                    </select>
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
                        Goal Amount:
                    </label>
                    <input
                        type="number"
                        name="goal"
                        value={formData.goal}
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
                    Add Campaign
                </button>
            </form>
        </div>
    );
}
