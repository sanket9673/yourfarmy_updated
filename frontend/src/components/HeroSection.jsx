import React, { useState, useEffect } from 'react';
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const apiKey = "a839753be3216b88e85fbccc56024f7e"; // Your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const HeroSection = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Smart Farming Advisor States
  const [crop, setCrop] = useState('wheat');
  const [location, setLocation] = useState('Punjab');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [forecastResult, setForecastResult] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);

  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket("ws://localhost:8001/alerts");
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'alert') {
          setActiveAlert(data.message);
          setTimeout(() => setActiveAlert(null), 4000); // Auto-dismiss
        }
      };
    } catch (e) { }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleRunForecast = async () => {
    setIsAnalyzing(true);
    setForecastResult(null); // Reset output while loading
    try {
      const res = await fetch("http://localhost:8001/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, location })
      });
      if (res.ok) setForecastResult(await res.json());
    } catch (err) {
      console.error(err);
    }
    setIsAnalyzing(false);
  };

  const checkWeather = async () => {
    setError('');
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setWeatherData(null);
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
          className="border border-gray-300 rounded-md p-2 mb-4 w-64 shadow-md"
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
        </div>
      )}

      {/* SMART FARMING ADVISOR UI */}
      <div className="mt-12 p-6 border border-neutral-700 rounded-lg w-full max-w-4xl shadow-md text-left bg-neutral-900/40 relative">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text mb-6">
          Smart Farming Advisor
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Input Sidebar */}
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <div>
              <label className="text-sm text-neutral-300 font-medium pb-1 block">Crop Name</label>
              <input value={crop} onChange={(e) => setCrop(e.target.value)} disabled={isAnalyzing} className="w-full bg-neutral-800 text-neutral-200 p-3 rounded border border-neutral-700 focus:border-orange-500 outline-none text-base" />
            </div>
            <div>
              <label className="text-sm text-neutral-300 font-medium pb-1 block">Location</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} disabled={isAnalyzing} className="w-full bg-neutral-800 text-neutral-200 p-3 rounded border border-neutral-700 focus:border-orange-500 outline-none text-base" />
            </div>

            <button
              onClick={handleRunForecast}
              disabled={isAnalyzing}
              className={`mt-2 w-full text-white px-4 py-3 rounded shadow transition font-bold tracking-wide ${isAnalyzing ? 'bg-orange-800 cursor-not-allowed text-orange-400' : 'bg-orange-500 hover:bg-orange-600'}`}>
              {isAnalyzing ? 'Analyzing farm conditions...' : 'Get Farming Advice'}
            </button>
          </div>

          {/* Output Display */}
          <div className="flex-1">
            {isAnalyzing ? (
              <div className="bg-neutral-800/50 p-6 rounded h-full flex flex-col items-center justify-center border border-neutral-700 border-dashed min-h-[300px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-neutral-400 font-medium tracking-wide">Connecting to AI Agent...</p>
              </div>
            ) : forecastResult ? (
              <div className="flex flex-col gap-4 h-full">
                {/* Row 1: Output Stats */}
                <div className="flex gap-4">
                  <div className={`bg-neutral-800 p-4 rounded border-b-4 flex-1 shadow-inner ${forecastResult.demand?.level === 'High' ? 'border-green-500' : forecastResult.demand?.level === 'Moderate' ? 'border-yellow-500' : 'border-red-500'}`}>
                    <p className="text-xs text-orange-400 uppercase tracking-wide mb-1">Expected Demand</p>
                    <p className={`text-3xl font-bold ${forecastResult.demand?.level === 'High' ? 'text-green-500' : forecastResult.demand?.level === 'Moderate' ? 'text-yellow-500' : 'text-red-500'}`}>
                      {forecastResult.demand?.level || 'Moderate'} <span className="text-lg font-normal text-neutral-300 tracking-wide">(≈ {forecastResult.demand?.value} {forecastResult.demand?.unit})</span>
                    </p>
                  </div>
                  <div className={`bg-neutral-800 p-4 rounded border-b-4 flex-1 shadow-inner ${forecastResult.yield?.level === 'High' ? 'border-green-500' : forecastResult.yield?.level === 'Moderate' ? 'border-yellow-500' : 'border-red-500'}`}>
                    <p className="text-xs text-orange-400 uppercase tracking-wide mb-1">Estimated Harvest</p>
                    <p className={`text-3xl font-bold ${forecastResult.yield?.level === 'High' ? 'text-green-500' : forecastResult.yield?.level === 'Moderate' ? 'text-yellow-500' : 'text-red-500'}`}>
                      {forecastResult.yield?.level || 'Moderate'} <span className="text-lg font-normal text-neutral-300 tracking-wide">(≈ {forecastResult.yield?.value} {forecastResult.yield?.unit})</span>
                    </p>
                  </div>
                </div>
                <p className="text-center text-xs text-neutral-500 -mt-2 -mb-1 italic">Values are AI-estimated based on regional trends and may vary in real conditions.</p>

                {/* Row 2: Recommendation Card */}
                <div className={`bg-neutral-800 p-5 rounded border-l-4 shadow-inner ${forecastResult.recommendation === 'Plant' ? 'border-green-500' : forecastResult.recommendation === 'Wait' ? 'border-orange-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">✅ Recommendation</p>
                    <span className={`text-xs bg-neutral-700 px-3 rounded-full py-1 border border-neutral-600 shadow font-medium`}>{forecastResult.confidence} Confidence</span>
                  </div>
                  <h3 className={`text-3xl font-bold mt-1 tracking-wide ${forecastResult.recommendation === 'Plant' ? 'text-green-500' : forecastResult.recommendation === 'Wait' ? 'text-orange-400' : 'text-red-500'}`}>
                    {forecastResult.recommendation}
                  </h3>
                </div>

                {/* Row 3: Risks & Insight */}
                <div className="bg-neutral-800 p-5 rounded border border-neutral-700 shadow-inner mt-1">
                  <p className="text-xs text-red-400 uppercase tracking-wide mb-3">⚠️ Risks</p>
                  <ul className="list-disc pl-5 text-sm text-neutral-300 mb-4 space-y-1">
                    {forecastResult.risks?.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  <div className="bg-neutral-700/40 p-3 rounded border-l-2 border-orange-500">
                    <p className="text-sm italic text-neutral-300 leading-relaxed">"{forecastResult.insight}"</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-800/50 p-6 rounded h-full flex flex-col items-center justify-center border border-neutral-700 border-dashed min-h-[300px]">
                <span className="text-5xl mb-3">🌱</span>
                <p className="text-neutral-500 text-base">Enter crop and location to view intelligent insights.</p>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Alerts Toast Overlay (Single, Fade out) */}
        {activeAlert && (
          <div className="absolute -top-14 right-0 z-50 animate-bounce transition-all duration-300">
            <div className="bg-neutral-900 border-l-4 border-red-500 text-neutral-100 px-5 py-4 text-sm rounded shadow-2xl min-w-[250px] flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-medium tracking-wide">{activeAlert}</span>
            </div>
          </div>
        )}
      </div>

      {/* <div className='flex mt-10 justify-center'>
        <video autoPlay loop muted className='rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4'>
          <source src={video1} type='video/mp4' />
          Your Browser doesn't Support .
        </video>
        <video autoPlay loop muted className='rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4'>
          <source src={video2} type='video/mp4' />
          Your Browser doesn't Support .
        </video>
      </div> */}
    </div>
  );
};

export default HeroSection;
