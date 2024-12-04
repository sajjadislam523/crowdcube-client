import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaigns }) => {
    const { _id, title, description, goal, raised, creator } = campaigns;
    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        navigate(`/campaigns/${id}`);
    };

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-md campaign-card">
            <h2 className="mb-4 text-xl font-semibold">{title}</h2>
            <p className="mb-4 text-gray-700">{description}</p>
            <p className="mb-2 text-sm text-gray-500">
                <span className="font-medium">Goal:</span> ${goal} |{" "}
                <span className="font-medium">Raised:</span> ${raised}
            </p>
            <p className="mb-4 text-sm text-gray-500">
                <span className="font-medium">Owner:</span> {creator}
            </p>
            <button
                onClick={() => handleViewDetails(_id)}
                className="px-4 py-2 mt-auto text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                View Details
            </button>
        </div>
    );
};

CampaignCard.propTypes = {
    campaigns: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        goal: PropTypes.number.isRequired,
        raised: PropTypes.number.isRequired,
        creator: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default CampaignCard;
