import { FaArrowAltCircleLeft } from "react-icons/fa";

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="w-full flex justify-start px-6 mb-20">
                <FaArrowAltCircleLeft size={40} className="text-blue-500 cursor-pointer" />
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[800px]">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign Up</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <div className="flex flex-col items-center">
                                <label htmlFor="fullName" className=" text-sm font-medium mb-1">Full Name</label>
                                <input type="text" id="fullName" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your full name" />
                            </div>

                            <div className="flex flex-col items-center mt-5">
                                <label htmlFor="dob" className="block text-sm font-medium mb-1">Date of Birth</label>
                                <input type="date" id="dob" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>

                            <div className="flex flex-col items-center mt-5">
                                <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                                <input type="text" id="username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Choose a unique username" />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col items-center">
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your email" />
                            </div>
                            <div className="flex flex-col items-center mt-5">
                                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                                <input type="password" id="password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Create a password" />
                            </div>

                            <div className="flex flex-col items-center mt-5">
                                <label htmlFor="role" className="block text-sm font-medium mb-1">Role Type</label>
                                <select id="role" className="w-full h-[42px] px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="user">Normal User</option>
                                    <option value="staff">Staff Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
