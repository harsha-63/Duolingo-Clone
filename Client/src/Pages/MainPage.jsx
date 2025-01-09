import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/UserComponents/Sidebar';
import UserStats from '../Components/UserComponents/UserStats';
import Learn from './Learn';// Assuming LearnPage is a separate component
import PracticePage from './Practice'; // Assuming PracticePage is a separate component
// import LeaderboardPage from './LeaderboardPage'; // Assuming LeaderboardPage is a separate component
// import QuestsPage from './QuestsPage'; // Assuming QuestsPage is a separate component
import Profile from './Profile' // Assuming ProfilePage is a separate component

const MainPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <div className="w-1/6">
        <Sidebar />
      </div>
      
      {/* Main content section */}
      <div className="w-3/6 p-6 bg-gray-100">
        <Routes>
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<PracticePage />} />
          {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
          {/* <Route path="/quests" element={<QuestsPage />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* Add more routes for other content */}
        </Routes>
      </div>

      {/* User stats and footer on the right */}
      <div className="w-2/6 p-6 bg-white">
        <UserStats />
        <footer className="text-center mt-4 text-sm text-gray-500">
          &copy; 2025 LuxeLiving. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default MainPage;


