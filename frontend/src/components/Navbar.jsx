import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="text-2xl font-bold mb-4 md:mb-0">Customer Management System</div>
      <div className="flex flex-col md:flex-row">
        {isAuthenticated ? (
          <>
            <Link className="mb-2 md:mb-0 md:mr-4 hover:underline" to="/">Home</Link>
            <Link className="mb-2 md:mb-0 md:mr-4 hover:underline" to="/customers">Customers</Link>
            <Link className="mb-2 md:mb-0 md:mr-4 hover:underline" to="/revenue">Revenue</Link>
            <Link className="mb-2 md:mb-0 md:mr-4 hover:underline" to="/add-customer">Add Customer</Link>
            <button onClick={handleLogout} className="mb-2 md:mb-0 hover:underline">Logout</button>
          </>
        ) : (
          <Link className="hover:underline" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
