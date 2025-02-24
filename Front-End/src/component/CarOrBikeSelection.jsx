import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarOrBikeSelection = () => {
  const navigate = useNavigate();

  const handleSelectCarpool = () => {
    // Navigate to the Carpool or Bikepool page
    navigate('/carpool');
  };

  const handleSelectBike = () => {
    // Navigate to the Bike selection page
    navigate('/bike');
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-4xl font-bold text-center">Ride Sharing</h1>
      <p className="text-center text-gray-600">Carpool • Bikepool </p>

      {/* Carpool Section */}
      <div
        onClick={handleSelectCarpool}
        className="mt-8 p-4 bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer"
      >
        <div>
          <h2 className="text-2xl font-bold">Carpool</h2>
          <p className="text-gray-600">Carpool/ bikepool for daily commuting</p>
        </div>
        <img src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Carpool" className="w-20 h-20" />
      </div>

      {/* Bike Section */}
      <div
        onClick={handleSelectBike}
        className="mt-6 p-4 flex items-center justify-between cursor-pointer"
      >
        <div>
          <h2 className="text-2xl font-bold">Bike</h2>
          <p className="text-gray-600">Affordable bike rides for short distances</p>
        </div>
        <img src="https://th.bing.com/th?id=OIP.Rk5t3WYp-PyRfM6c_Z0i6QHaEi&w=319&h=195&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="Bike" className="w-20 h-20" />
      </div>
    </div>
  );
};

export default CarOrBikeSelection;
