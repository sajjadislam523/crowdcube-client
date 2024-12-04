import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";

const RegisterPage = () => {
    const { setUser, createNewUser, updateUserProfile } =
        useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        const passwordConfirmation = /^(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (!passwordConfirmation.test(password)) {
            setError(
                "Password must contain at least one uppercase letter and one lowercase letter"
            );
            return;
        }

        createNewUser(email, password)
            .then((res) => {
                const user = res.user;
                Swal.fire({
                    title: "Success!",
                    text: "Account created successfully!",
                    icon: "success",
                    confirmButtonText: "Close",
                });

                updateUserProfile({
                    name,
                    photo,
                })
                    .then(() => {
                        const updatedUser = { ...user, name, photo };
                        setUser(updatedUser);
                        navigate("/");
                    })
                    .catch((profileError) => {
                        Swal.fire({
                            title: "Error!",
                            text: profileError.message,
                            icon: "error",
                            confirmButtonText: "Close",
                        });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Close",
                });
            });
    };

    return (
        <div className="py-8 font-nunito">
            <h1 className="py-8 text-3xl font-bold text-center">
                Signup here!
            </h1>
            <div className="w-full max-w-sm mx-auto shadow-2xl card bg-base-100 shrink-0">
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            className="input input-bordered"
                            required
                            name="name"
                        />
                    </div>
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
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="text"
                            placeholder="photo url"
                            className="input input-bordered"
                            required
                            name="photo"
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
                        {error && (
                            <p className="mb-4 text-sm text-red-500">{error}</p>
                        )}
                        <label className="label">
                            <span className="label-text-alt">
                                Already have an account?
                            </span>
                            <Link
                                to="/login"
                                className="ml-2 text-sm text-blue-500 link link-hover"
                            >
                                Login here
                            </Link>
                        </label>
                    </div>
                    <div className="mt-6 form-control">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
