import { useLoaderData } from "react-router-dom";
import CampaignCard from "./CampaignCard";

const AllCampaignsPage = () => {
    const campaigns = useLoaderData();

    return (
        <div className="px-6 py-8 all-campaigns">
            <h1 className="mb-8 text-3xl font-bold text-center">
                All Campaigns
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign._id} campaigns={campaign} />
                ))}
            </div>
        </div>
    );
};

export default AllCampaignsPage;
