import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const resp = await axios.get("/api/profile-data");
        console.log("response for profile = ", resp);
        setData(resp.data.data || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Profile</h2>
        {data.length > 0 ? (
          data.map((profile, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Full Name:</span>
                <span className="text-base text-gray-300">{profile.fullName || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Date of Birth:</span>
                <span className="text-base text-gray-300">{profile.dob || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Username:</span>
                <span className="text-base text-gray-300">{profile.username || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-base text-gray-300">{profile.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Role:</span>
                <span className="text-base text-gray-300 capitalize">{profile.role || 'N/A'}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No profile data available</div>
        )}
        <button  onClick={() => console.log('Edit Profile clicked')}  className={`mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${data.length<=0? "opacity-45 cursor-not-allowed" : ""}`} disabled={data.length<=0 ? true: false}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
