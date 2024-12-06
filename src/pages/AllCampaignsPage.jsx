import { useLoaderData, useNavigate } from "react-router-dom";

const AllCampaignsPage = () => {
    const campaigns = useLoaderData();

    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        navigate(`/campaigns/${id}`);
    };

    return (
        <div className="px-6 py-8">
            <h1 className="mb-8 text-3xl font-bold text-center">
                All Campaigns
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="text-gray-700 bg-gray-100">
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Goal</th>
                            <th className="px-4 py-2 text-left">Raised</th>
                            <th className="px-4 py-2 text-left">Creator</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign._id} className="border-t">
                                <td className="px-4 py-2">{campaign.title}</td>
                                <td className="px-4 py-2">{campaign.type}</td>
                                <td className="px-4 py-2">${campaign.goal}</td>
                                <td className="px-4 py-2">
                                    ${campaign.raised}
                                </td>
                                <td className="px-4 py-2">
                                    {campaign.creator}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() =>
                                            handleViewDetails(campaign._id)
                                        }
                                        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                        See More
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllCampaignsPage;
