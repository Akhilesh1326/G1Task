import React from 'react'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between bg-slate-900 text-white">
        <div className='m-4 text-xl font-bold'>
          G1
        </div>
        <div className="flex">
          <button className='m-4 ' onClick={()=>{navigate("/login")}}>
            Login
          </button>
          <button className='m-4 ' onClick={()=>{navigate("/register")}}>
            Register
          </button>
          <button className='m-4 ' onClick={()=>{navigate("/login")}}>
            About Task
          </button>

        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-5xl font-bold mt-10 '>
          It's a Demo Site for Project: Pariksha Mitra
        </div>  
        <div className='h-1 w-[800px] bg-blue-950 mt-3'></div>
        <div className='text-xl font-light'>
        Pariksha Mitra is a comprehensive digital examination platform for Marathi medium students 
        from 5th to 10th standard.
        </div>

      </div>
      <div>

      </div>
    </div>
  )
}

export default App
