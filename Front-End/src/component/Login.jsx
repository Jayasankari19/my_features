import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 // Importing smiley icon from react-icons
 import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
 import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; // or other icons you need

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data); // Debugging

      if (response.data.message === 'Login successful!') {
        const { userId, role } = response.data;
        localStorage.setItem('userId', userId);

        // Toast with smiley emoji after successful login
        toast.success(
          <div className="flex items-center">
            <FaSmile className="mr-2 text-2xl text-yellow-500" /> {/* Smile icon */}
            <span>Login successful!</span>
          </div>,
          {
            position: 'top-center', // Ensure position is set correctly
            className: 'bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg',
          }
        );

        // Navigate after successful login
        if (role === 'ridee') {
          navigate('/car-or-bike-selection');
        } 
      } else {
        toast.error(response.data.message || 'Invalid email or password.', {
          position: 'top-center', // Ensuring position is correct
          className: 'bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg',
        });
      }
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error);
      toast.error('Login failed. Please try again.', {
        position: 'top-center', // Ensuring position is correct
        className: 'bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[800px]">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <div className="flex items-center border rounded-lg p-2 w-full">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="outline-none w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center border rounded-lg p-2 w-full">
                <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-3" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="outline-none w-full"
                />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">Login</button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-600">Sign up</a>
          </p>
        </div>
        {/* Right Section */}
        <div className="w-1/2 flex justify-center items-center bg-gray-100">
          <img src="https://thumbs.dreamstime.com/b/man-woman-riding-yellow-motor-scooter-city-couple-moped-flat-style-urban-vehicle-vector-illustration-224240855.jpg" alt="Login" className="w-full h-full object-cover" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;