import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)

      const isAuthPage =
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup'

      if (isAuthPage) {
        navigate('/home', { replace: true })
      }
    }
  }, [location, navigate, setIsAuthenticated])

  return null
}

export default RefreshHandler
