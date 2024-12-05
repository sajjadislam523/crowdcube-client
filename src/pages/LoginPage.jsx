import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const LoginPage = () => {
    const { theme } = useContext(ThemeContext);
    const { logIn, handleGoogleLogIn, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        logIn(email, password)
            .then((res) => {
                setUser(res.user);
                Swal.fire("Success", "User Logged in successfully", "success");
                navigate("/");
            })
            .catch((err) => {
                Swal.fire("Error", err.response.data.message, "error");
            });
    };

    const saveUserToDatabase = async (user) => {
        try {
            // Check if the user's email already exists in the database
            const emailCheckRes = await fetch(
                "http://localhost:5000/users/" + encodeURIComponent(user.email),
                {
                    method: "GET",
                }
            );

            if (emailCheckRes.ok) {
                const emailExists = await emailCheckRes.json();

                if (emailExists) {
                    console.log("User with the same email already exists.");
                    return;
                }
            } else {
                console.error("Failed to check email existence.");
                return;
            }

            // Save the user data to the database
            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }),
            });

            if (!res.ok) {
                console.error("Failed to save the user data");
            } else {
                console.log("User data saved successfully.");
            }
        } catch (err) {
            console.error("Error saving the data to the database", err.message);
        }
    };

    const googleLogin = () => {
        handleGoogleLogIn()
            .then((res) => {
                setUser(res.user);
                saveUserToDatabase(res.user);

                Swal.fire("Success", "Logged in successfully", "success");
                navigate("/");
            })
            .catch((err) => {
                Swal.fire("Error", err.message, "error");
            });
    };

    return (
        <div className="py-8 font-nunito">
            <h1 className="py-8 text-3xl font-bold text-center">Login here!</h1>
            <div className="w-full max-w-sm mx-auto shadow-2xl card bg-base-100 shrink-0">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            required
                            name="email"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                            name="password"
                        />

                        <label className="label">
                            <span className="label-text-alt">
                                Don&apos;t have an account?
                            </span>
                            <Link
                                to="/register"
                                className="ml-2 text-sm text-blue-500 link link-hover"
                            >
                                Register here
                            </Link>
                        </label>
                    </div>
                    <div className="mt-6 form-control">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <button
                            onClick={googleLogin}
                            className={`flex items-center justify-center w-full gap-3 p-3 my-4 transition duration-300 border rounded-lg shadow-md 
            ${
                theme === "light"
                    ? "bg-white text-gray-700 hover:bg-gray-100"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
                        >
                            <FcGoogle className="text-2xl" />
                            <span className="text-sm font-medium">
                                Sign in with Google
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
