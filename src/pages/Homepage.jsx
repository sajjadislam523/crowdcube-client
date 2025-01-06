import { useContext } from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import waterDonation from "../assets/sliderImage/donationWater.jpeg";
import fundingBusiness from "../assets/sliderImage/fundingBusiness.webp";
import schoolDonation from "../assets/sliderImage/schoolDonation.png";
import RunningCampaigns from "../components/RunningCampaigns";
import { ThemeContext } from "../context/ThemeProvider";

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
            } font-nunito`}
        >
            {/* Hero Section */}
            <div
                className={`py-8 ${
                    theme === "light"
                        ? "bg-gradient-to-r from-blue-50 to-green-50"
                        : "bg-gray-900 text-white"
                }`}
            >
                {/* Heading with Fade Animation */}
                <Fade cascade damping={0.2} triggerOnce>
                    <h1 className="mb-6 text-3xl font-extrabold text-center font-nunito md:text-4xl">
                        <Typewriter
                            words={[
                                "Empower Dreams Through Crowdfunding",
                                "Make a Difference Today",
                                "Support Campaigns That Matter",
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="_"
                            typeSpeed={80}
                            deleteSpeed={60}
                            delaySpeed={1500}
                        />
                    </h1>
                </Fade>

                {/* Subtext with Slide Animation */}
                <Slide direction="up" triggerOnce>
                    <p
                        className={`mb-8 text-center ${
                            theme === "light"
                                ? "text-gray-500"
                                : "text-gray-400"
                        } md:text-lg`}
                    >
                        Join our community to make a difference—one campaign at
                        a time.
                    </p>
                </Slide>

                {/* Swiper with Zoom Animation */}
                <Zoom triggerOnce>
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
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50 rounded-lg font-nunito">
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
                </Zoom>
            </div>

            {/* How You Can Help Section */}
            <div className="px-6 py-10 md:px-12 lg:px-20">
                {/* Section Title with Slide Animation */}
                <Slide direction="down" triggerOnce>
                    <h2 className="mb-6 text-2xl font-extrabold text-center font-nunito md:text-3xl">
                        How You Can Help
                    </h2>
                </Slide>

                {/* Cards with Fade Animation */}
                <Fade cascade damping={0.2} triggerOnce>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="p-6 text-center border-l-4 border-blue-500 rounded-lg shadow-md bg-blue-50">
                            <h3 className="text-xl font-semibold text-blue-600 font-nunito">
                                <Typewriter
                                    words={["Start a Campaign"]}
                                    loop={true}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={80}
                                    deleteSpeed={60}
                                    delaySpeed={1500}
                                />
                            </h3>
                            <p className="mt-2 text-gray-700">
                                Create campaigns to raise funds for causes you
                                care about.
                            </p>
                        </div>
                        <div className="p-6 text-center border-l-4 border-green-500 rounded-lg shadow-md bg-green-50">
                            <h3 className="text-xl font-semibold text-green-600 font-nunito">
                                <Typewriter
                                    words={["Contribute to Campaigns"]}
                                    loop={true}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={80}
                                    deleteSpeed={60}
                                    delaySpeed={1500}
                                />
                            </h3>
                            <p className="mt-2 text-gray-700">
                                Explore and donate to campaigns that resonate
                                with you.
                            </p>
                        </div>
                        <div className="p-6 text-center border-l-4 border-yellow-500 rounded-lg shadow-md bg-yellow-50">
                            <h3 className="text-xl font-semibold text-yellow-600 font-nunito">
                                <Typewriter
                                    words={["Share Your Story"]}
                                    loop={true}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={80}
                                    deleteSpeed={60}
                                    delaySpeed={1500}
                                />
                            </h3>
                            <p className="mt-2 text-gray-700">
                                Share your experiences to inspire others and
                                spread hope.
                            </p>
                        </div>
                    </div>
                </Fade>
            </div>

            {/* Running Campaigns Section */}
            <div className="py-10">
                <Fade triggerOnce>
                    <RunningCampaigns />
                </Fade>
            </div>

            {/* Call-to-Action Section */}
            <div
                className={`py-12 border-b-2 ${
                    theme === "light"
                        ? "bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100"
                        : "bg-gray-900"
                }`}
            >
                <Fade triggerOnce>
                    <div className="max-w-4xl px-6 mx-auto text-center">
                        <h3
                            className={`mb-4 text-2xl font-nunito font-bold ${
                                theme === "light"
                                    ? "text-gray-700"
                                    : "text-white"
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
                            <Link
                                to="/addCampaign"
                                className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                            >
                                Start a Campaign
                            </Link>
                            <Link
                                to="/campaigns"
                                className="px-6 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700"
                            >
                                Explore Campaigns
                            </Link>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default Homepage;
