import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-wrap w-screen justify-between bg-slate-900 text-white p-4">
        <div className="text-xl font-bold">G1</div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md" onClick={() => { navigate('/login-username'); }}>
            Login
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md" onClick={() => { navigate('/register'); }}>
            Register
          </button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md" onClick={() => { navigate('/about-task'); }}>
            About Task
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-4 w-screen">
        <div className="text-3xl md:text-5xl font-bold mt-10 text-center">
          It's a Demo Site for Project: Pariksha Mitra
        </div>
        <div className="h-1 w-full max-w-xl bg-blue-950 mt-3"></div>
        <div className="text-lg md:text-xl font-light mt-3 text-center px-4 md:px-0">
          Pariksha Mitra is a comprehensive digital examination platform for Marathi medium students
          from 5th to 10th standard.
        </div>
        <div className="text-lg md:text-xl text-center px-4 md:px-0 mt-10 text-red-500 font-bold">
          My Task :  MERN Full Stack Developer
        </div>
        <div className="text-lg md:text-lg text-center px-4 md:px-0 mt-3 mx-28 bg-gray-200 rounded-lg py-2">
          Responsibilities:
          <div className='text-md md:text-lg text-center px-4 md:px-0 mt-2 flex flex-col '>
            The responsibilities include setting up the MERN project structure by initializing the project, configuring environment variables, and establishing a MongoDB connection. 
          </div>
          <div className='text-md md:text-lg text-center px-4 md:px-0 mt-2 flex flex-col '>
          Backend development tasks involve implementing a user model, creating authentication routes (/api/auth/register and /api/auth/login), implementing password hashing, generating and validating JWT tokens, and creating middleware for role-based access control.
          </div>
          <div className='text-md md:text-lg text-center px-4 md:px-0 mt-2 flex flex-col '>
          On the frontend, the tasks include developing registration and login pages, implementing protected routes and managing authentication state, and displaying user information post-login. Finally, deployment responsibilities include deploying the application on Render, configuring environment settings, and setting up continuous integration for seamless updates.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
