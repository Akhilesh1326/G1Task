import { FaArrowAltCircleLeft } from "react-icons/fa";

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="w-full flex justify-start px-6 py-4">
                <FaArrowAltCircleLeft size={40} className="text-blue-500 cursor-pointer" />
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign Up</h2>

                <form className="space-y-6">

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                        <input type="text" id="username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Choose a username" />
                    </div>


                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Create a password" />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
