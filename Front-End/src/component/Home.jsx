import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home bg-cover bg-center min-h-screen bg-blue-100" style={{ backgroundImage: "" }}>
      

      {/* Main Container */}
      <div className="flex justify-between items-center min-h-screen px-12">
        
        {/* Left - Image */}
        <div className="flex-1 flex justify-center">
          <div className="w-full h-full overflow-hidden">
            <img
              src="https://media.giphy.com/media/LpW8NlEe3KBlXoLpXd/giphy.gif"
              alt="Background"
              className="w-full h-[700px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="flex-1 flex justify-center items-center">
          <div className="p-8 max-w-lg text-center  ">
            <h1 className="text-3xl font-bold text-blue-800 mb-3">
              Reliable Bike Services,<br /> Anytime, Anywhere!
            </h1>
            <p className="text-lg text-gray-700 italic ">
              "Discover nearby bike service stations and book appointments effortlessly. 
              Own a bike service station? Register your details and attract customers. 
              Manage bookings and services efficiently with our platform."
            </p>
            <div className="mt-5 flex justify-center">
              <Link 
                to="/login" 
                className="bg-blue-800 text-white px-6 py-3 text-lg rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
              >
                 Explore
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;