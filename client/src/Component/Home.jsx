import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div id="home" className='absolute top-0 w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center pt-10  bg-gradient-to-r from-purple-500 to-pink-500'>
        <div >
          <div >
            <h1 className='md:text-4xl lg:text-6xl text-2xl font-bold text-white tracking-widest'>Welcome to LMS</h1>
            <h2 className='text-amber-400 font-medium md:text-3xl lg:text-4xl text-2xl mt-6 mb-20 leading-10'>We are best for Library Management System</h2>

            <div className='space-x-1 flex gap-6 items-center justify-center'>
              <Link to="/login"><button type="button" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded text-lg px-4 py-2 text-center ">Login</button></Link>
              <Link to="/signup"><button type="button" className="w-32  text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded text-lg px-4 py-2 text-center ">Sign up</button></Link>
            </div>
            <Link to="/adminlogin"><button type="button" className="w-30 mt-4 text-white bg-gradient-to-l from-purple-500 via-purple-600 to-purple-700  hover:bg-gradient-to-br font-md text-sm rounded p-2  text-center ">Admin Login</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
