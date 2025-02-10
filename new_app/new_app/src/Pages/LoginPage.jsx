import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-2xl">Issue Tracker</h1>
    <nav>
  <Link to="/" className="mx-2 p-2 bg-green-300 rounded">
    Home
  </Link>
  <Link to="/login" className="mx-2 p-2 bg-green-400 rounded">
    Login
  </Link>
  <Link to="/logout" className="mx-2 p-2 bg-green-500 rounded">
    Logout
  </Link>
  <Link to="/register" className="mx-2 p-2 bg-green-600 rounded">
    Register
  </Link>
</nav>
  </header>
  )
}

export default Header
