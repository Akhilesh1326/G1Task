import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../utility/api";

const Register = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [birthDate, setbirthDate] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [error, setError] = useState("");
    const [load, setLoad] = useState(false);

    function validateForm(fullName, birthDate, userName, email, password, role) {
        if (!fullName || !birthDate || !userName || !email || !password || !role) {
            setError("All fields must be filled out.");
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return false;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }

        const validRoles = ["admin", "user", "staff"];
        if (!validRoles.includes(role)) {
            setError("Invalid role selected.");
            return false;
        }

        return true;
    }

    const submitRegisterForm = async () => {
        if (!validateForm(fullName, birthDate, userName, email, password, role)) {
            return;
        }
        setLoad(true);
        try {
            const resp = await API.post(
                "/api/auth/register",
                { fullName, birthDate, userName, email, password, role },
                { withCredentials: true }
            );

            const status = resp.data.status;

            if (status === "good") {
                setLoad(false);
                setError("");
                navigate("/accessDemo");
            } else if (status === "repeat") {
                setLoad(false);
                setError(
                    "Data Repeation, Please Enter unique username and email to proceed"
                );
            } else {
                setLoad(false);
                setError("Unexpected error occured");
            }
        } catch (error) {
            setLoad(false);
            console.log("error while registering", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="w-full flex justify-start px-6 py-4 bg-gray-900">
                <FaArrowAltCircleLeft    size={40}    className="text-blue-500 cursor-pointer"    onClick={() => {        navigate("/");    }}/>
            </div>

            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl">
                    <div className="absolute text-xl text-red-500 top-16 md:top-24 text-center w-full">
                        {error}
                    </div>
                    <div className="bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
                            Sign Up
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex flex-col">
                                        <label    htmlFor="fullName" className="text-sm font-medium mb-1">
                                            Full Name
                                        </label>
                                        <input type="text" id="fullName" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  hover:scale-105 duration-300 hover:shadow-[0px_0px_7px_1px_#1983ed]"    placeholder="Enter your full name"    value={fullName}    onChange={(e) => {        setFullName(e.target.value);    }}/>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <label    htmlFor="dob"    className="text-sm font-medium mb-1">
                                            Date of Birth
                                        </label>
                                        <input type="date" id="dob" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none   hover:scale-105 duration-300 hover:shadow-[0px_0px_7px_1px_#1983ed]"    value={birthDate}    onChange={(e) => {        setbirthDate(e.target.value);    }}/>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <label    htmlFor="username" className="text-sm font-medium mb-1">
                                            Username
                                        </label>
                                        <input type="text" id="username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  hover:scale-105 duration-300 hover:shadow-[0px_0px_7px_1px_#1983ed]"    placeholder="Choose a unique username"    value={userName}    onChange={(e) => {        setUserName(e.target.value);    }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col">
                                        <label    htmlFor="email"    className="text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <input    type="email"    id="email"    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  hover:scale-105 duration-300 hover:shadow-[0px_0px_7px_1px_#1983ed]"    placeholder="Enter your email"    value={email}    onChange={(e) => {        setEmail(e.target.value);    }}/>
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        <label    htmlFor="password"    className="text-sm font-medium mb-1">
                                            Password
                                        </label>
                                        <input    type="password"    id="password"    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  hover:scale-105 duration-300 hover:shadow-[0px_0px_7px_1px_#1983ed]"    placeholder="Create a password"    value={password}    onChange={(e) => {        setPassword(e.target.value);    }}/>
                                    </div>

                                    <div className="flex flex-col mt-5">
                                        <label htmlFor="role" className="text-sm font-medium mb-1">
                                            Role Type
                                        </label>
                                        <select id="role" className="w-full h-[42px] px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  hover:scale-105 duration-300 hover:shadow-[0px_0px_7px_1px_#1983ed]" value={role} onChange={(e) => {     setRole(e.target.value); }}>
                                            <option value="null">
                                                Select Role Type
                                            </option>
                                            <option value="user">
                                                Normal User
                                            </option>
                                            <option value="staff">
                                                Staff Member
                                            </option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => {     submitRegisterForm(); }} className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-75  hover:scale-105 hover:shadow-[0px_0px_7px_1px_#092139] ${load ? "cursor-wait" : "cursor-default" }`} disabled={load}>
                                {load ? "Loading..." : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
