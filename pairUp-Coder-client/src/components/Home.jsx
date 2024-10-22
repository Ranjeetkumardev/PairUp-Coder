import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login'); // Assuming the login route is "/login"
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#0D1117] text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to PairUp</h1>
        <p className="text-lg">Collaborate and grow with PairUp!</p>
      </div>
      <button
        onClick={goToLogin}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Home;
