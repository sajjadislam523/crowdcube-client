import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import schoolDonation from "../assets/sliderImage/schoolDonation.png";
import waterDonation from "../assets/sliderImage/donationWater.jpeg";
import fundingBusiness from "../assets/sliderImage/fundingBusiness.webp";

const Homepage = () => {
    const { theme } = useContext(ThemeContext);

    const slides = [
        {
            id: 1,
            image: schoolDonation,
            title: "Empower Education for All",
            description:
                "Join our mission to transform the lives of underprivileged children by providing them access to quality education. Your contributions will fund essential school supplies, uniforms, and scholarships, paving the way for a brighter future.",
        },
        {
            id: 2,
            image: waterDonation,
            title: "Clean Water, Healthy Lives",
            description:
                "Be a part of the change by helping us deliver safe and clean drinking water to remote and underserved communities. With your support, we can reduce waterborne diseases and improve the health and well-being of thousands of families.",
        },
        {
            id: 3,
            image: fundingBusiness,
            title: "Revive Small Businesses",
            description:
                "Support local entrepreneurs as they recover from the challenges of the pandemic. Your donations will help them rebuild their businesses, create jobs, and contribute to the economic recovery of their communities.",
        },
    ];

    return (
        <div
            className={`${
                theme === "light" ? "bg-gray-50" : "bg-gray-800 text-white"
            }`}
        >
            <div
                className={`py-8 ${
                    theme === "light"
                        ? "bg-gradient-to-r from-blue-50 to-green-50"
                        : "bg-gray-900 text-white"
                }`}
            >
                <h1 className="mb-6 text-3xl font-extrabold text-center md:text-4xl">
                    Empower Dreams Through Crowdfunding
                </h1>
                <p
                    className={`mb-8 text-center ${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                    } md:text-lg`}
                >
                    Join our community to make a difference—one campaign at a
                    time.
                </p>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="w-full mx-auto md:w-4/5"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="object-cover object-center w-full h-64 rounded-lg md:h-80 lg:h-96"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50 rounded-lg">
                                    <h2 className="text-lg font-bold md:text-2xl lg:text-3xl">
                                        {slide.title}
                                    </h2>
                                    <p className="mt-2 text-sm text-center md:text-base lg:text-lg">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="px-6 py-10 md:px-12 lg:px-20">
                <h2 className="mb-6 text-2xl font-extrabold text-center md:text-3xl">
                    How You Can Help
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-6 text-center border-l-4 border-blue-500 rounded-lg shadow-md bg-blue-50">
                        <h3 className="text-xl font-semibold text-blue-600">
                            Start a Campaign
                        </h3>
                        <p className="mt-2 text-gray-700">
                            Create campaigns to raise funds for causes you care
                            about.
                        </p>
                    </div>
                    <div className="p-6 text-center border-l-4 border-green-500 rounded-lg shadow-md bg-green-50">
                        <h3 className="text-xl font-semibold text-green-600">
                            Contribute to Campaigns
                        </h3>
                        <p className="mt-2 text-gray-700">
                            Explore and donate to campaigns that resonate with
                            you.
                        </p>
                    </div>
                    <div className="p-6 text-center border-l-4 border-yellow-500 rounded-lg shadow-md bg-yellow-50">
                        <h3 className="text-xl font-semibold text-yellow-600">
                            Share Your Story
                        </h3>
                        <p className="mt-2 text-gray-700">
                            Share your experiences to inspire others and spread
                            hope.
                        </p>
                    </div>
                </div>
            </div>

            <div
                className={`py-12 border-b-2 ${
                    theme === "light"
                        ? "bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100"
                        : "bg-gray-900"
                }`}
            >
                <div className="max-w-4xl px-6 mx-auto text-center">
                    <h3
                        className={`mb-4 text-2xl font-bold ${
                            theme === "light" ? "text-gray-700" : "text-white"
                        } md:text-3xl`}
                    >
                        Ready to Make a Difference?
                    </h3>
                    <p
                        className={`mb-6 ${
                            theme === "light"
                                ? "text-gray-600"
                                : "text-gray-400"
                        } md:text-lg`}
                    >
                        Start a campaign or explore projects you can support
                        today.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">
                            Start a Campaign
                        </button>
                        <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700">
                            Explore Campaigns
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
