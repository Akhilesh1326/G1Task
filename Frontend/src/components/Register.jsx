import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [birthDate, setbirthDate] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const [error, setError] = useState("")
    const [load, setLoad] = useState(false);


    function validateForm(fullName, birthDate, userName, email, password, role) {

        if (!fullName || !birthDate || !userName || !email || !password || !role) {
            setError('All fields must be filled out.');

            return false
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format.')
            return false
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.')
            return false
        }

        const validRoles = ['admin', 'user', 'staff'];
        if (!validRoles.includes(role)) {
            setError('Invalid role selected.')
            return false
        }

        return true
    }

    const submitRegisterForm = async () => {
        if (!validateForm(fullName, birthDate, userName, email, password, role)) {
            return
        }
        setLoad(true);
        console.log(fullName,
            birthDate,
            userName,
            email,
            password,
            role)
        try {
            const resp = await axios.post("/api/auth/register", {
                fullName,
                birthDate,
                userName,
                email,
                password,
                role
            },{
                withCredentials: true
            }); 

            console.log("response for registering = ", resp);
            const status = resp.data.status;

            if (status == "good") {
                setLoad(false);
                setError("")
                navigate("/accessDemo")

            }
            else if (status == "repeat") {
                setLoad(false);
                setError("Data Repeation, Please Enter unique username and email to proceed")
            }
            else {
                setLoad(false);
                setError("Unexpected error occured")
            }

        } catch (error) {
            setLoad(false);

            console.log("error while registering", error);
        }
    }
    return (
        <div>

            <div className="w-full flex justify-start px-6 py-4 bg-gray-900 ">

                <FaArrowAltCircleLeft size={40} className="text-blue-500 cursor-pointer" onClick={() => { navigate("/") }} />
            </div>

            <div className="h-[605px] bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="absolute     text-xl text-red-500 top-28">{error}   </div>
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[800px]">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign Up</h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <div className="flex flex-col items-center">
                                    <label htmlFor="fullName" className=" text-sm font-medium mb-1"  >Full Name</label>
                                    <input type="text" id="fullName" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your full name" value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                                </div>

                                <div className="flex flex-col items-center mt-5">
                                    <label htmlFor="dob" className="block text-sm font-medium mb-1" >Date of Birth</label>
                                    <input type="date" id="dob" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={birthDate} onChange={(e) => { setbirthDate(e.target.value) }} />
                                </div>

                                <div className="flex flex-col items-center mt-5">
                                    <label htmlFor="username" className="block text-sm font-medium mb-1" >Username</label>
                                    <input type="text" id="username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Choose a unique username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col items-center">
                                    <label htmlFor="email" className="block text-sm font-medium mb-1" >Email</label>
                                    <input type="email" id="email" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="flex flex-col items-center mt-5">
                                    <label htmlFor="password" className="block text-sm font-medium mb-1" >Password</label>
                                    <input type="password" id="password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Create a password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div className="flex flex-col items-center mt-5">
                                    <label htmlFor="role" className="block text-sm font-medium mb-1" >Role Type</label>
                                    <select id="role" className="w-full h-[42px] px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" value={role} onChange={(e) => { setRole(e.target.value) }}>
                                        <option value="null">Select Role Type</option>
                                        <option value="user">Normal User</option>
                                        <option value="staff">Staff Member</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <button onClick={() => { submitRegisterForm() }} className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-75 ${load ? 'cursor-wait' : 'cursor-default'}`} disabled={load ? true : false}>
                            {load ? "/" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
