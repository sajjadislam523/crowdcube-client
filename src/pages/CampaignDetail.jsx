import { useLoaderData, useNavigate } from "react-router-dom";

const CampaignDetail = () => {
    const campaign = useLoaderData();
    const navigate = useNavigate();

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
        thumbnail,
        title,
        description,
        creator,
        goal,
        raised,
        expirationDate,
        _id,
    } = campaign;

    const handleDonateClick = () => {
        navigate(`/campaigns/${_id}/donate`, {
            state: { campaign },
        });
    };

    return (
        <div className="max-w-5xl px-4 py-8 mx-auto">
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
                {thumbnail && (
                    <div className="w-full h-64 sm:h-80 md:h-96">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
                <div className="p-6">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">
                        {title}
                    </h1>
                    <p className="mb-6 text-lg text-gray-700">{description}</p>

                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-lg font-semibold text-gray-600">
                                Goal
                            </p>
                            <p className="text-2xl font-bold text-green-500">
                                ${goal}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-lg font-semibold text-gray-600">
                                Raised
                            </p>
                            <p className="text-2xl font-bold text-blue-500">
                                ${raised}
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 text-gray-600 text-md">
                        <p>
                            <strong>Creator:</strong> {creator}
                        </p>
                        <p>
                            <strong>Expiration Date:</strong>{" "}
                            {new Date(expirationDate).toLocaleDateString()}
                        </p>
                    </div>

                    <button
                        className="w-full px-6 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600"
                        onClick={handleDonateClick}
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetail;
