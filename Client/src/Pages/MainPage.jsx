import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Components/UserComponents/Sidebar';
import UserStats from '../Components/UserComponents/UserStats';
import Content from '../Components/UserComponents/Content';

const MainPage = () => {
  const [activeContent, setActiveContent] = useState('learn');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/learn') {
      setActiveContent('learn');
    } else if (location.pathname === '/practice') {
      setActiveContent('practice');
    } else if (location.pathname === '/leaderboard') {
      setActiveContent('leaderboard');
    } else if (location.pathname === '/quests') {
      setActiveContent('quests');
    } else if (location.pathname === '/profile') {
      setActiveContent('profile');
    }
  }, [activeContent, location.pathname]);

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-3/6 p-6 bg-gray-100">
        <Content activeContent={activeContent} />
      </div>
      <div className="w-2/6 p-6 bg-white">
        <UserStats />
       
      </div>
    </div>
  );
};

export default MainPage;



