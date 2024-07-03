import React from 'react';

function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Home Page</h1>
        <p className="text-gray-600 text-center">
          Добро пожаловать на домашнюю страницу!
        </p>
      </div>
    </div>
  );
}

export default Home;