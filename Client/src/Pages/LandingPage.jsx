import { useState } from 'react';
import Login from '../Components/AuthComponents/Login';
import SignUp from '../Components/AuthComponents/SignUp';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const toggleAuthMode = () => {
    setIsLogin(!isLogin); 
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <NavLink to={'/'} className="absolute top-6 left-6 z-10">
  <FaTimes className="text-2xl text-gray-500 cursor-pointer" />
</NavLink>

<div className="absolute top-6 right-6 z-10">
  <button
    onClick={toggleAuthMode}
    className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-100 transition-all"
  >
    {isLogin ? 'Sign Up' : 'Login'}
  </button>
</div>


      {isLogin ? <Login /> : <SignUp />}
    </div>
  );
};

export default LandingPage;
