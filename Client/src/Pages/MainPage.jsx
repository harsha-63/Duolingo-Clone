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
    } else if (location.pathname === '/sounds') {
      setActiveContent('sounds');
    } else if (location.pathname === '/shop') {
      setActiveContent('shop');
    }
  }, [location.pathname]);
  

  return (
    <div className="flex h-screen max-md:flex-col">
  <div className="w-1/6 border-r border-gray-300 max-md:w-full max-md:fixed max-md:bottom-0 max-md:left-0 max-md:z-50 max-md:bg-white">
    <Sidebar />
  </div>

  <div className="w-3/6 p-6 overflow-y-auto hide-scrollbar max-md:w-full">
    <Content activeContent={activeContent} />
  </div>

  <div className="w-2/6 p-6 bg-white overflow-y-auto hide-scrollbar max-md:hidden">
    <UserStats />
  </div>
</div>
);
};

export default MainPage;



