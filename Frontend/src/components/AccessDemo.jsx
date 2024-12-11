import React from 'react'

const AccessDemo = () => {
  return (
    <div>
      <div className="flex justify-between bg-slate-900 text-white">
        <div className='m-4 text-xl font-bold'>
          G1
        </div>
        <div className='flex'>
          <button>Profile</button>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div>Access Controller Demo</div>
        <div className='flex'>
        <button>User Access</button>
        <button>Staff Access</button>
        <button>Admin Access</button>
          
        </div>
      </div>
    </div>
  )
}

export default AccessDemo
