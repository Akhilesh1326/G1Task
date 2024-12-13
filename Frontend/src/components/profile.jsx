import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const resp = await axios.get("/api/profile-data");
        console.log("response for profile = ", resp.data.data);
        setData(resp.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getProfileData();
  }, []);

  return (
    <div>
      <div className="flex justify-between bg-black text-white p-4 shadow-lg">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold">G1</div>
        <div className="flex items-center">
          <button  className="bg-blue-600 px-3 sm:px-4 py-2 rounded-md mx-1 sm:mx-2 hover:bg-blue-700 transition duration-300"  onClick={() => {navigate("/accessDemo");  }}>
            Home
          </button>
        </div>
      </div>
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Profile</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Full Name:</span>
            <span className="text-base text-gray-300">{data?.fullName || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Date of Birth:</span>
            <span className="text-base text-gray-300">{data?.birthDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Username:</span>
            <span className="text-base text-gray-300">{data?.userName || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-base text-gray-300">{data?.email || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Role:</span>
            <span className="text-base text-gray-300 capitalize">{data?.role || 'N/A'}</span>
          </div>
        </div>
        <button onClick={() => console.log('Edit Profile clicked')} className={`mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${data?.length <= 0 ? "opacity-45 cursor-not-allowed" : ""}`} disabled={data?.length <= 0 ? true : false}>
          Edit Profile
        </button>
      </div>
    </div>
  </div>
  );
};

export default Profile;
