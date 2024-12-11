import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const submitLoginData = async() =>{
        console.log(userName, password)
        try {
            const resp = await axios.post("http://localhost:3500/api/auth/loginby-username",{
                userName,
                password
            })

            console.log("response from server = ",resp);
        } catch (error) {
            console.log("Error while loggin by username = ",error);
        }
    }

    return (
        <div>
            <div className="w-full flex justify-start px-6 py-4 bg-gray-900">
                <FaArrowAltCircleLeft size={40} className="text-blue-500 cursor-pointer" login-username/>
            </div>
            <div className="h-[605px] bg-gray-900 text-white flex flex-col items-center justify-center">

                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px]">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign Up</h2>

                    <div className="space-y-6">

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                            <input type="text" id="username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your User Name" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input type="password" id="password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>

                        <button onClick={() =>{submitLoginData()}} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
