import  { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { NavLink } from 'react-router-dom';

const UserStats = () => {
  const { user } = useContext(AuthContext);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [showStreak, setShowStreak] = useState(false);
  const [showGems, setShowGems] = useState(false);
  const [showHearts, setShowHearts] = useState(false);


  // eslint-disable-next-line react/prop-types
  const Tooltip = ({ isVisible, children }) => (
    isVisible && (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
    
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-white border-l border-t border-gray-200 transform -rotate-45" />
        </div>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[300px]">
          {children}
        </div>
      </div>
    )
  );
  return (
    <div className="max-w-4xl mx-auto p-4 pr-16">
      {/* Stats Bar */}
      <div className="flex items-center justify-between  p-4 mb-6">
        {/* Flag */}
        <div className="relative">
          <img
            src={user?.language || 'path/to/defaultFlag.png'}
            alt={user?.language || 'Language Flag'}
            className="w-8 h-6"
            onMouseEnter={() => setHoveredStat('flag')}
            onMouseLeave={() => setHoveredStat(null)}
          />
          <Tooltip isVisible={hoveredStat === 'flag'}>
            <p className="text-gray-700">Your learning language: {user?.language || 'Not set'}</p>
          </Tooltip>
        </div>

        {/* Streak */}
        <div className="relative">
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onMouseEnter={() => setShowStreak(true)}
            onMouseLeave={() => setShowStreak(false)}
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/ba95e6081679d9d7e8c132da5cfce1ec.svg"
              alt="Streak"
              className="w-6 h-6"
            />
           <span className="text-gray-700">{user?.streak || 0}</span>

          </div>
          <Tooltip isVisible={showStreak}>
            <h3 className="text-lg font-bold mb-2">{user.streak} day streak</h3>
            <p className="text-gray-600">Do a lesson today to extend your streak!</p>
            <div className="mt-4">
              <div className="bg-gray-100 rounded-full h-2 w-full">
                <div className="bg-orange-500 h-2 rounded-full w-1/7"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-orange-500 rounded-xl text-white">
              <div className="flex items-center gap-2">
                <img src="/api/placeholder/24/24" alt="Friend Streaks" className="w-6 h-6" />
                <div>
                  <h4 className="font-bold">Friend Streaks</h4>
                  <p className="text-sm">0 active Friend Streaks</p>
                </div>
              </div>
              <button className="mt-2 bg-white text-orange-500 rounded-lg px-4 py-2 w-full">
                VIEW LIST
              </button>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-xl">
              <h4 className="font-bold">Streak Society</h4>
              <p className="text-sm text-gray-600">
                Reach a 7 day streak to join the Streak Society and earn exclusive rewards.
              </p>
            </div>
          </Tooltip>
        </div>

        {/* Gems */}
        <div className="relative">
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onMouseEnter={() => setShowGems(true)}
            onMouseLeave={() => setShowGems(false)}
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/45c14e05be9c1af1d7d0b54c6eed7eee.svg"
              alt="Gems"
              className="w-6 h-6"
            />
            <span className="text-blue-500">{user?.gems || 500}</span>

          </div>
          <Tooltip isVisible={showGems}>
            <h3 className="text-lg font-bold mb-2">Gems</h3>
            <p className="text-gray-600">You have {user.gems} gems</p>
            <button className="mt-2 text-blue-500 font-bold">GO TO SHOP</button>
          </Tooltip>
        </div>

        {/* Hearts */}
        <div className="relative">
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onMouseEnter={() => setShowHearts(true)}
            onMouseLeave={() => setShowHearts(false)}
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
              alt="Hearts"
              className="w-6 h-6"
            />
         <span className="text-red-500">{user?.life ?? 5}</span>

          </div>
          <Tooltip isVisible={showHearts}>
            <h3 className="text-lg font-bold mb-2">Hearts</h3>
            <p className="text-gray-600 mb-4">You have full hearts</p>
            <p className="text-gray-500">Keep on learning</p>
            <div className="mt-4 space-y-2">
              <button className="w-full py-2 px-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">∞</span>
                  <span>UNLIMITED HEARTS</span>
                </div>
                <span className="text-purple-600">FREE TRIAL</span>
              </button>
              <button className="w-full py-2 px-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <span>REFILL HEARTS</span>
                <span className="flex items-center gap-1">
                  <img src="/api/placeholder/16/16" alt="Gems" className="w-4 h-4" />
                  350
                </span>
              </button>
              <button className="w-full py-2 px-4 rounded-xl border border-gray-200 text-left">
                PRACTICE TO EARN HEARTS
              </button>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Unlock Leaderboards Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Unlock Leaderboards!</h2>
        <div className="flex items-center">
          <img
            src="/api/placeholder/48/48"
            alt="Leaderboard Icon"
            className="w-12 h-12 mr-4"
          />
          <span className="text-gray-600">
            Complete 10 more lessons to start competing
          </span>
        </div>
      </div>

      {/* Daily Quests Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Daily Quests</h2>
        <p className="text-sm text-gray-600">Complete your daily tasks for rewards!</p>
      </div>

      {/* Create Profile Section */}
      <div className="bg-white py-6  rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          Create a profile to save your progress!
        </h2>
        <div className="flex flex-col items-center gap-4 mt-4 ">
          <button className="w-80 h-12 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors">
            Create Profile
          </button>
          <NavLink to="/isloggin" className="w-80">
            <button className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Sign In
            </button>
          </NavLink>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm font-semibold text-gray-400 font-playpen">
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