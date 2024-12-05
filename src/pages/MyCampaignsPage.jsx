import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const MyCampaignPage = () => {
    const { user } = useContext(AuthContext);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            // Handle the case where the user is not logged in
            return;
        }

        const fetchUserCampaigns = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/campaigns?email=${user.email}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch campaigns");
                }

                const data = await response.json();
                const userCampaigns = data.filter(
                    (campaign) => campaign.creator === user.email
                );
                setCampaigns(userCampaigns);
            } catch (error) {
                console.error("Error fetching campaigns:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCampaigns();
    }, [user]);

    const handleDelete = async (id) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this campaign?"
        );

        if (confirmation) {
            try {
                const response = await fetch(
                    `http://localhost:5000/campaigns/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                if (response.ok) {
                    setCampaigns(
                        campaigns.filter((campaign) => campaign._id !== id)
                    );
                } else {
                    console.error("Failed to delete campaign");
                }
            } catch (error) {
                console.error("Error deleting campaign:", error.message);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="py-8 font-nunito">
            <h1 className="text-3xl font-bold text-center">My Campaigns</h1>
            {campaigns.length === 0 ? (
                <p className="text-center">
                    You have not added any campaigns yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border border-gray-300">
                                    Title
                                </th>
                                <th className="px-4 py-2 border border-gray-300">
                                    Description
                                </th>
                                <th className="px-4 py-2 border border-gray-300">
                                    Status
                                </th>
                                <th className="px-4 py-2 border border-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign) => (
                                <tr
                                    key={campaign._id}
                                    className="border-b hover:bg-gray-100"
                                >
                                    <td className="px-4 py-2 border border-gray-300">
                                        {campaign.title}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {campaign.description}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {campaign.status}
                                    </td>
                                    <td className="flex px-4 py-2 space-x-2 border border-gray-300">
                                        <Link
                                            to={`/updateCampaign/${campaign._id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(campaign._id)
                                            }
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
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

export default MyCampaignPage;
