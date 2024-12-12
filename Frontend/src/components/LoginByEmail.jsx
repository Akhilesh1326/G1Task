import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [load, setLoad] = useState(false);

    function validateForm(email, password) {
        if (!email || !password) {
            setError('All fields must be filled out.');
            setLoad(false);
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setLoad(false);
            setError('Invalid email format.');
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoad(false);
            return false;
        }

        return true;
    }

    const submitLoginData = async () => {
        setLoad(true);

        if (!validateForm(email, password)) {
            return;
        }

        console.log(email, password);
        try {
            const resp = await axios.post("/api/auth/loginby-email", {
                email,
                password,
            });

            console.log("response from server = ", resp);
            const status = resp.data.status;

            if (status === "Not Found") {
                setError("User not found, Please try again");
                setLoad(false);
            } else if (status === "good") {
                setError("");
                setLoad(false);
                navigate("/accessDemo");
            } else if (status === "Password Mismatch") {
                setLoad(false);
                setError("Password is invalid, please enter correct");
            } else {
                setLoad(false);
                setError("Unexpected error occurred");
            }
        } catch (error) {
            console.log("Error while logging in by email = ", error);
        }
    };

    return (
        <div>
            <div className="h-screen  bg-gray-900 text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="absolute text-sm sm:text-base text-red-500  sm:top-28 ">{error}</div>

                <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-auto sm:max-w-[400px] lg:max-w-[500px]">
                    <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-blue-500">
                        Sign Up
                    </h2>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm sm:text-base font-medium mb-1">
                                Email
                            </label>
                            <input type="email" id="email" className="w-full px-3 sm:px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm sm:text-base font-medium mb-1">
                                Password
                            </label>
                            <input type="password" id="password" className="w-full px-3 sm:px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                        </div>

                        <button onClick={submitLoginData} className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 $     load ? "cursor-wait" : "cursor-pointer }`} disabled={load}>
                            <div className={`${load ? "animate-spin" : "animate-none"}`}>
                                {load ? "|" : "Log In"}
                            </div>
                        </button>

                        <div className="flex justify-center">
                            <button
                                className="text-sm sm:text-base text-slate-200 font-bold"
                                onClick={() => {
                                    navigate("/login-username");
                                }}
                            >
                                Login using email, click <span className="text-blue-500">here</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
