import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/NeoCode.png'
import { Player } from '@lottiefiles/react-lottie-player'
import codingAnimation from '../assets/code-animation.json'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginInfo
    if (!email || !password) return handleError('Email and password are required')

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      })

      const result = await response.json()
      const { success, message, jwtToken, name, error } = result

      if (success) {
        handleSuccess(message)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => navigate('/home'), 1000)
      } else if (error) {
        const details = error?.details?.[0]?.message || 'Login failed'
        handleError(details)
      } else {
        handleError(message)
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      {/* Left-side animation (hidden on small screens) */}
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <Player autoplay loop src={codingAnimation} className="w-[400px] h-[400px]" />
      </div>

      {/* Login form */}
      <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-2xl flex flex-col items-center z-10">
        <img src={logo} alt="NeoCode Logo" className="w-32 h-auto mb-6" />
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-800">Welcome to NeoCode</h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={loginInfo.email}
              placeholder="Enter your email..."
              className="text-base p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginInfo.password}
              placeholder="Enter your password..."
              className="text-base p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-purple-600 text-white text-lg font-semibold py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-purple-600 font-medium hover:underline">
              Signup
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Login

