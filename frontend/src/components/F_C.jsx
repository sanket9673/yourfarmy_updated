import React from 'react';
import { useNavigate } from 'react-router-dom';

const F_C = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSelect = (role) => {
    if (role === 'customer') {
      navigate('/workflow'); // Navigate to the customer buying area
    } else if (role === 'farmer') {
      navigate('/farmer-form'); // Navigate to the farmer selling area
    }
  };

  return (
    <div className='mt-20 text-center'>
      <h2 className='mb-10 text-3xl sm:text-5xl lg:text-6xl tracking-wide'>
        Welcome to the 
        <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'> Farmer-Consumer Platform </span>
      </h2>
      <p className='mb-10 text-md text-neutral-600'>
        Please select your role to continue:
      </p>
      <div className='flex justify-center space-x-4'>
        <button 
          onClick={() => handleSelect('customer')} 
          className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600'
        >
          Customer
        </button>
        <button 
          onClick={() => handleSelect('farmer')} 
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Farmer
        </button>
      </div>
    </div>
  );
};

export default F_C;
