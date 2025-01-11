import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { NavLink } from 'react-router-dom';

const UserStats = () => {
  const { user } = useContext(AuthContext);

  const {
    flagUrl = 'https://example.com/default-flag.png',
    xp = 0,
    gems = 500,
    life = 5,
  } = user || {};

  return (
    <div className="space-y-6 mr-28">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center">
          <img src={flagUrl} alt="Language Flag" className="w-10 h-10" />
        </div>
        <div className="flex items-center space-x-2">
          <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/ba95e6081679d9d7e8c132da5cfce1ec.svg" alt="Fire Icon" className="w-6 h-6" />
          <span className="font-semibold text-gray-500">{xp}</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/45c14e05be9c1af1d7d0b54c6eed7eee.svg" alt="Gem Icon" className="w-6 h-6" />
          <span className="font-semibold text-blue-400">{gems}</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg" alt="Heart Icon" className="w-6 h-6" />
          <span className="font-semibold text-red-400">{life}</span>
        </div>
      </div>
      <div className="p-6 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Unlock Leaderboards!</h2>
        <div className="flex items-center">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/d1f31f71a5b1d513184cc278d910cb33.svg"
            alt="Leaderboard Icon"
            className="w-12 h-12 mr-4"
          />
          <span className="text-base text-gray-600">
            Complete 10 more lessons to start competing
          </span>
        </div>
      </div>
      <div className="p-10 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Daily Quests</h2>
        <p className="text-sm text-gray-600">Complete your daily tasks for rewards!</p>
      </div>
      <div className="py-6 px-4 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Create a profile to save your progress!</h2>
        <div className="flex justify-center mt-4">
          <button className="w-96 h-12 px-4 py-2 bg-lime-500 text-white rounded-lg">Create Profile</button>
        </div>
        <NavLink to={'/isloggin'} className="flex justify-center mt-4">
          <button className="w-96 h-12 px-4 py-2 bg-blue-500 text-white rounded-lg">Sign Up</button>
        </NavLink>
      </div>
      <footer className="text-center mt-4 text-sm text-gray-500">
        &copy; 2025 LuxeLiving. All rights reserved.
      </footer>
    </div>
  );
};

export default UserStats;






// https://d35aaqx5ub95lt.cloudfront.net/vendor/ba95e6081679d9d7e8c132da5cfce1ec.svg
// https://d35aaqx5ub95lt.cloudfront.net/vendor/45c14e05be9c1af1d7d0b54c6eed7eee.svg
// https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg