// import React from 'react' ;
// import video1 from "../assets/video1.mp4" ;
// import video2 from "../assets/video2.mp4" ;

// const HeroSection = () => {
//   return (
//     <div className='flex flex-col items-center mt-6 lg:mt-20'>
//         <h1 className='text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide'>
//             YourFarmy - 
//             <span className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'> Empowering Farmers </span>
//         </h1>
//         <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>
//         Bring your farming vision to life with our innovative tools and resources. 
//         Get started today to cultivate success and connect directly with consumers for a brighter agricultural future!
//         </p>
//         {/* <div className="flex justify-center my-10">
//             <a href="#" className='bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md'>Start for Free</a>
//             <a href="#" className='py-3 px-4 mx-3 rounded-md border'>Documentation</a>
//         </div> */}
//         <div className='flex mt-10 justify-center'>
//             <video autoPlay loop muted className='rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4'>
//             <source src={video1} type='video/mp4' />
//             Your Browser doesn't Support .
//             </video>
//             <video autoPlay loop muted className='rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4'>
//             <source src={video2} type='video/mp4' />
//             Your Browser doesn't Support .
//             </video>
//         </div>
//     </div>
//   )
// }

// export default HeroSection ;




import React, { useState } from 'react';
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const apiKey = "a839753be3216b88e85fbccc56024f7e"; // Your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const HeroSection = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const checkWeather = async () => {
    setError(''); // Reset error message
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      
      if (!response.ok) {
        // Check if the response is not OK
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err); // Log error for debugging
      setError(err.message); // Set the error message
      setWeatherData(null); // Clear previous weather data
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (city.trim() !== '') {
      checkWeather();
    } else {
      setError('Please enter a city name');
    }
  };

  return (
    <div className='flex flex-col items-center mt-6 lg:mt-20'>
      <h1 className='text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide'>
        YourFarmy - 
        <span className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'> Empowering Farmers </span>
      </h1>
      <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>
        Bring your farming vision to life with our innovative tools and resources. 
        Get started today to cultivate success and connect directly with consumers for a brighter agricultural future!
      </p>
      
      <form onSubmit={handleSearch} className="flex flex-col items-center mt-10">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 mb-4 w-64 shadow-md" // Spacing and styling
      />
      <button type="submit" className="bg-orange-500 text-white rounded-md p-2 w-64 shadow-md hover:bg-orange-600 transition duration-300">
        Get Weather
      </button>
      </form>


      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {weatherData && (
        <div className="mt-4 p-4 border border-neutral-700 rounded-lg text-center">
          <h2 className="text-2xl">{weatherData.name}</h2>
          <p className="text-lg">{weatherData.main.temp}°C</p>
          <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-lg">Wind Speed: {weatherData.wind.speed} km/h</p>
          {/* <img
            src={`./images/${weatherData.weather[0].main.toLowerCase()}.png`}
            alt={weatherData.weather[0].main}
            className="weather-icon mt-2"
          /> */}
        </div>
      )}

      <div className='flex mt-10 justify-center'>
        <video autoPlay loop muted className='rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4'>
          <source src={video1} type='video/mp4' />
          Your Browser doesn't Support .
        </video>
        <video autoPlay loop muted className='rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4'>
          <source src={video2} type='video/mp4' />
          Your Browser doesn't Support .
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
