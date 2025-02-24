import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import { FaSmile } from 'react-icons/fa';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!age) {
      toast.error('Age is required');
      return;
    }
    // Validation checks...

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
       mobileNumber,
        password,
        age,
        gender,
      });

      console.log('Registration response:', response.data);

      if (response.data.success) {
        toast.success(
          <div className="flex items-center">
            <FaSmile className="mr-2 text-2xl text-yellow-500" /> Smile icon
            <span>User registered successfully</span>
          </div>,
          {
            className: 'bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg',
          }
        );

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left Side - Image */}
        <div className="w-3/5 hidden md:block">
          <img
            src="https://img.freepik.com/premium-vector/person-use-autonomous-online-car-sharing-service-man-near-smartphone-screen-with-route-points-location-car-city-map-online-ordering-taxi-rent-auto-group-people-sharing-auto_458444-912.jpg?w=1800"
            alt="Car Sharing"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-2/5 p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Create an Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

<input
  type="number"
  placeholder="Age"
  value={age}
  onChange={(e) => setAge(e.target.value)}
  required
  className="w-full p-2 border border-gray-300 rounded"
/>

            <label className="block text-gray-700">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              type="submit"
            >
              Register
            </button>
          </form>

          <ToastContainer />
          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;