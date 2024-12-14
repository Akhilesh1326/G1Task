import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utility/api";


const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [load, setLoad] = useState(false);

    function validateForm(userName, password) {

        if (!userName || !password) {
            setError('All fields must be filled out.');
            setLoad(false);

            return false
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.')
            setLoad(false);

            return false
        }
        return true
    }

    const submitLoginData = async () => {
        setLoad(true);

        if (!validateForm(userName, password)) {
            return
        }


        console.log(userName, password)
        try {
            const resp = await API.post("/api/auth/loginby-username", {
                userName,
                password
            })

            console.log("response from server = ", resp);
            setLoad(false);
            const status = resp.data.status;

            if (status === "Not Found") {
                setLoad(false);
                setError("User not found, please try again")
            }
            else if (status === "good") {
                setLoad(false);
                setError("")
                navigate("/accessDemo")
            }
            else if(status == "Password Mismatch"){
                setLoad(false);     
                setError("Password is invalid please enter correct");
            }
            else {
                setLoad(false);
                setError("Unexpected error occured")
            }

        } catch (error) {
            setLoad(false);

            console.log("Error while loggin by username = ", error);
        }
    }

    return (
        <div>
            <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="absolute     text-xl text-red-500 top-28">{error}</div>

                <div className="bg-gray-800 p-8 rounded-lg shadow-lg lg:w-[400px] sm:w-[300px]">    
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign Up</h2>

                    <div className="space-y-6">

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                            <input type="text" id="username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 duration-200 hover:shadow-[0px_0px_7px_1px_#1983ed] " placeholder="Enter your User Name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input type="password" id="password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  hover:scale-105 duration-200 hover:shadow-[0px_0px_7px_1px_#1983ed]" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <button onClick={() => { submitLoginData() }} className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-45  hover:scale-105 hover:shadow-[0px_0px_7px_1px_#092139]  ${load ? 'cursor-wait' : 'cursor-default'}`} disabled={load ? true : false}>
                            <div className={`${load ? ' animate-spin' : 'animate-none'}`}>
                                {load ? "|" : "Log In"}
                            </div>
                        </button>
                        <div className="flex  justify-center">
                            <button className="text-slate-200 font-bold" onClick={() => { navigate("/login-email") }}>Login using email, click <span className="text-blue-500">here</span></button>
                        </div>
                    </div>
                </div>
                <button onClick={() => { navigate("/register") }} className="mt-1 font-bold">
                    New here, <span className="text-blue-500">Register</span> first
                </button>
            </div>
        </div>
    );
};

export default Login;
