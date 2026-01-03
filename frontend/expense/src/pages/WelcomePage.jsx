// WelcomePage.jsx
import React from 'react';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Image / Illustration */}
      <div className="relative w-64 h-64 mb-8">
        <img
          src={logo} // replace with your image path
          alt="Personal Expense Tracker Illustration"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      <h1 className="text-xl font-semibold text-gray-700 mb-2 text-center">
        Hey! I am your
      </h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        PERSONAL EXPENSE TRACKER
      </h2>

      {/* Button */}
      <button className="bg-blue-400 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-500 transition duration-300" onClick={()=>{
        navigate("/mainscreen")
      }}>
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
