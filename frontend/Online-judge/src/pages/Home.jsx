import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('User logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/problems'
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      setProducts(result)
    } catch (err) {
      handleError(err.message || 'Failed to fetch products')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {loggedInUser} 👋</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="space-y-3">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600">₹{item.price}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products available</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
