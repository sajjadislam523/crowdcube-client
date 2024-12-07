import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
            <h1
                className="font-extrabold text-transparent bg-clip-text text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[10rem] leading-none"
                style={{
                    backgroundImage: "url('/error-bg.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                }}
            >
                Oops!
            </h1>
            <h2 className="mt-4 text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
                404 - PAGE NOT FOUND
            </h2>
            <p className="max-w-md mt-2 text-xs text-gray-600 sm:text-sm md:text-base lg:text-lg">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="px-4 py-2 mt-6 text-xs font-semibold text-white transition duration-300 bg-blue-600 rounded-full shadow-md sm:text-sm md:text-base lg:text-lg hover:bg-blue-700"
            >
                GO TO HOMEPAGE
            </Link>
        </div>
    );
};

export default ErrorPage;
