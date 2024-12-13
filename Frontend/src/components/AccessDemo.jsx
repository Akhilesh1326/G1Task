import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const AccessDemo = () => {

  const [message, setMessage] = useState("");
  const sendAccessRequestForAdmin = async() =>{
    try {
      const resp = await axios.get("/api/admin-page")
      console.log("request repsonse for admin = ",resp);

      if(resp.data.status == "good"){ 
        setMessage("Access Granted");
      }
      else {
        setMessage(resp.data.status)
      }
    } catch (error) {
      console.log("error in access request get call");
    } 
  }
  const sendAccessRequestForUser = async() =>{
    try {
      const resp = await axios.get("/api/user-page")
      console.log("request repsonse for User = ",resp);
      if(resp.data.status == "good"){ 
        setMessage("Access Granted");
      }
      else {
        setMessage(resp.data.status)
      }
    } catch (error) {
      console.log("error in access request get call = ",error);
    } 
  }
  const sendAccessRequestForStaff = async() =>{
    try {
      const resp = await axios.get("/api/staff-page")
      console.log("request repsonse for staff = ",resp);
      if(resp.data.status == "good"){ 
        setMessage("Access Granted");
      }
      else {
        setMessage(resp.data.status)
      }
    } catch (error) {
      console.log("error in access request get call");
    } 
  }

  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="flex justify-between bg-slate-900 text-white p-4 shadow-lg">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold">G1</div>
        <div className="flex items-center">
          <button  className="bg-blue-600 px-3 sm:px-4 py-2 rounded-md mx-1 sm:mx-2 hover:bg-blue-700 transition duration-300"  onClick={() => {    navigate("/profile");  }}>
            Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-10 py-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6 text-center">
          Access Controller Demo
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105 text-sm sm:text-base" onClick={()=>{sendAccessRequestForUser()}}>
            User Access
          </button>
          <button className="bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-yellow-700 transition duration-300 transform hover:scale-105 text-sm sm:text-base" onClick={()=>{sendAccessRequestForStaff()}}>
            Staff Access
          </button>
          <button className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105 text-sm sm:text-base" onClick={()=>{sendAccessRequestForAdmin()}}>
            Admin Access
          </button>
        </div>
        <div className={`text-red-500 text-lg mt-10 ${message=="Access Granted" ? "text-green-400": ""}`}>{message}</div>
      </div>
    </div>
  );
};

export default AccessDemo;
