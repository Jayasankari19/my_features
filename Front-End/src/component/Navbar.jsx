import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { House, LogIn } from 'lucide-react';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get the current route

  const handleLogout = () => {
    setUserName('');
    navigate('/home'); // Redirects to home after logout
  };

  // Change navbar color based on the current route
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const navbarBg = isHomePage ? "bg-gray-200" : "bg-white"; // Blue for home, white for other pages
  const textColor = isHomePage ? "text-gray-800" : "text-gray-900"; // Adjust text color accordingly

  return (
    <div className={`${navbarBg}`}>
      <nav className={`p-4 flex justify-between items-center shadow-lg transition duration-300`}>
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxd1qxTdtZ0f-uAjQeylhy2H8V0DHOquovAcXhJvSis8lAfIEn2SgfWsikfkVzXb-Y1C4&usqp=CAU" 
            alt="Logo" className="h-10 w-10 mr-2" 
          />
          <span className={`text-xl font-bold ${textColor}`}>Ride-Sharing</span>
        </div>

        {/* Right Side - Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className={`flex items-center space-x-2 hover:text-gray-500 ${textColor} transition duration-300`}>
            <House />
            <span className="flex items-center">
              <i className="fas fa-home mr-1"></i> Home
            </span>
          </Link>

          {userName ? (
            <>
              <Link to="/stationdisplay" className={`hover:text-gray-500 ${textColor} transition duration-300`}>
                <i className="fas fa-bicycle mr-1"></i> Browse Service Stations
              </Link>

              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  <i className="fas fa-user"></i> <span>{userName}</span>
                </button>

                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                    <Link to="/customerprofile" className="block px-4 py-2 hover:bg-gray-100">
                      View Booking
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className={`flex items-center space-x-2 hover:text-gray-500 ${textColor} transition duration-300`}>
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 focus:outline-none">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;