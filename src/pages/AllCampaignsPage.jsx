import { useLoaderData } from "react-router-dom";
import CampaignCard from "./CampaignCard";
import { Typewriter } from "react-simple-typewriter";

const AllCampaignsPage = () => {
    const campaigns = useLoaderData();

    return (
        <div className="px-6 py-8 all-campaigns">
            <h1 className="mb-8 text-3xl font-bold text-center font-nunito">
                <Typewriter
                    words={["All Campaigns"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={1500}
                />
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
