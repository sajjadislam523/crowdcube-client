import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";

const CampaignCard = ({ campaigns }) => {
    const { _id, title, description, goal, raised, creator, thumbnail } =
        campaigns;
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const handleViewDetails = (id) => {
        navigate(`/campaigns/${id}`);
    };

    return (
        <div
            className={`flex flex-col justify-between h-full p-6 transition-shadow duration-300 rounded-lg shadow-lg ${
                theme === "dark"
                    ? "bg-gray-800 text-white hover:shadow-xl"
                    : "bg-white text-gray-900 hover:shadow-xl"
            } campaign-card`}
        >
            <div>
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="flex flex-col mt-4 space-y-3">
                    <h2
                        className={`text-lg font-semibold transition-colors duration-300 hover:text-blue-500 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                    >
                        {title}
                    </h2>
                    <p
                        className={`text-gray-500 line-clamp-3 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                    >
                        {description}
                    </p>
                    <div className="flex justify-between text-sm">
                        <p
                            className={`${
                                theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            <span className="font-medium">Goal:</span> ${goal}
                        </p>
                        <p
                            className={`${
                                theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            <span className="font-medium">Raised:</span> $
                            {raised}
                        </p>
                    </div>
                    <p
                        className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        <span className="font-medium">Owner:</span> {creator}
                    </p>
                </div>
            </div>
            <button
                onClick={() => handleViewDetails(_id)}
                className="px-4 py-2 mt-4 text-sm font-medium text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
                See More
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
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
};

export default CampaignCard;
