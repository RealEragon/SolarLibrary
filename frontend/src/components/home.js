import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="container max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="hero">
          <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">Welcome to Your Personalized Experience</h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Explore a world of possibilities, tailored just for you.
          </p>
        </div>
        <div className="features">
          <ul className="list-none mb-8">
            <li className="flex items-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-3l2 2 4-4" />
              </svg>
              <p className="text-lg text-gray-600 ml-4">Personalized Libraries</p>
            </li>
            <li className="flex items-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2m-4 0V5a2 2 0 00-2-2" />
              </svg>
              <p className="text-lg text-gray-600 ml-4">Easy access to your favorite content</p>
            </li>
          </ul>
        </div>
        <div className="cta">
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/my-libraries')}>
          Get Started
        </button>
        </div>
      </div>
    </div>
  );
}

export default Home;