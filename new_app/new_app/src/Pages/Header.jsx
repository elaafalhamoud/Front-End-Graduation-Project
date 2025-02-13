import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-2xl">Issue Tracker</h1>
    <nav>
      <Link to="/" className="mx-2 p-2 bg-gray-500 rounded">
        Home
      </Link>
      <Link to="/login" className="mx-2 p-2 bg-blue-500 rounded">
        Login
      </Link>
      <Link to="/logout" className="mx-2 p-2 bg-red-500 rounded">
        Logout
      </Link>
      <Link to="/register" className="mx-2 p-2 bg-green-500 rounded">
        Register
      </Link>
    </nav>
  </header>
  )
}

export default Header
