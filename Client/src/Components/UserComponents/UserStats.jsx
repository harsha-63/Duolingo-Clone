import { useContext, useState } from 'react';
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

  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="space-y-6 mr-28">
      <div className="flex items-center justify-between space-x-4">
        {/* Flag Icon */}
        <div className="relative">
          <img
            src={flagUrl}
            alt="Language Flag"
            className="w-10 h-10"
            onMouseEnter={() => setHoveredStat('flag')}
            onMouseLeave={() => setHoveredStat(null)}
          />
          {hoveredStat === 'flag' && (
            <div className="absolute bottom-full left-0 p-2 bg-gray-700 text-white text-sm rounded shadow-lg">
              Displays your language flag.
            </div>
          )}
        </div>

        {/* XP Icon */}
        <div className="relative flex items-center space-x-2">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/ba95e6081679d9d7e8c132da5cfce1ec.svg"
            alt="XP Icon"
            className="w-6 h-6"
            onMouseEnter={() => setHoveredStat('xp')}
            onMouseLeave={() => setHoveredStat(null)}
          />
          <span className="font-semibold text-gray-500">{xp}</span>
          {hoveredStat === 'xp' && (
            <div className="absolute bottom-full left-0 p-2 bg-gray-700 text-white text-sm rounded shadow-lg">
              Experience points help you level up!
            </div>
          )}
        </div>

        {/* Gems Icon */}
        <div className="relative flex items-center space-x-2">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/45c14e05be9c1af1d7d0b54c6eed7eee.svg"
            alt="Gems Icon"
            className="w-6 h-6"
            onMouseEnter={() => setHoveredStat('gems')}
            onMouseLeave={() => setHoveredStat(null)}
          />
          <span className="font-semibold text-blue-400">{gems}</span>
          {hoveredStat === 'gems' && (
            <div className="absolute bottom-full left-0 p-2 bg-gray-700 text-white text-sm rounded shadow-lg">
              Use gems to unlock premium content!
            </div>
          )}
        </div>

        {/* Life Icon */}
        <div className="relative flex items-center space-x-2">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
            alt="Life Icon"
            className="w-6 h-6"
            onMouseEnter={() => setHoveredStat('life')}
            onMouseLeave={() => setHoveredStat(null)}
          />
          <span className="font-semibold text-red-400">{life}</span>
          {hoveredStat === 'life' && (
            <div className="absolute bottom-full left-0 p-2 bg-gray-700 text-white text-sm rounded shadow-lg">
              Life represents your remaining chances.
            </div>
          )}
        </div>
      </div>

      {/* Unlock Leaderboards Section */}
      <div className="p-6 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Unlock Leaderboards!</h2>
        <div className="flex items-center">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/d1f31f71a5b1d513184cc278d910cb33.svg"
            alt="Leaderboard Icon"
            className="w-12 h-12 mr-4"
            title="Leaderboard - Compete with others!"
          />
          <span className="text-base text-gray-600">
            Complete 10 more lessons to start competing
          </span>
        </div>
      </div>

      {/* Daily Quests Section */}
      <div className="p-10 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Daily Quests</h2>
        <p className="text-sm text-gray-600">Complete your daily tasks for rewards!</p>
      </div>

      {/* Create Profile Section */}
      <div className="py-6 px-4 border border-gray-300 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Create a profile to save your progress!</h2>
        <div className="flex justify-center mt-4">
          <button className="w-96 h-12 px-4 py-2 bg-lime-500 text-white rounded-lg">Create Profile</button>
        </div>
        <NavLink to={'/isloggin'} className="flex justify-center mt-4">
          <button className="w-96 h-12 px-4 py-2 bg-blue-500 text-white rounded-lg">Sign In</button>
        </NavLink>
      </div>

      {/* Footer */}
      <footer className="text-center mt-4 text-sm font-semibold text-gray-400 font-playpen">
        <div className="space-x-10">
          <NavLink to="/about" className="hover:text-blue-500">About</NavLink>
          <NavLink to="/privacy" className="hover:text-blue-500">Privacy</NavLink>
          <NavLink to="/career" className="hover:text-blue-500">Career</NavLink>
          <NavLink to="/blog" className="hover:text-blue-500">Blog</NavLink>
        </div>
        <div className="space-x-10 mt-2">
          <NavLink to="/store" className="hover:text-blue-500">Store</NavLink>
          <NavLink to="/terms" className="hover:text-blue-500">Terms</NavLink>
          <NavLink to="/investors" className="hover:text-blue-500">Investors</NavLink>
        </div>
      </footer>
    </div>
  );
};

export default UserStats;









// https://d35aaqx5ub95lt.cloudfront.net/vendor/ba95e6081679d9d7e8c132da5cfce1ec.svg
// https://d35aaqx5ub95lt.cloudfront.net/vendor/45c14e05be9c1af1d7d0b54c6eed7eee.svg
// https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg