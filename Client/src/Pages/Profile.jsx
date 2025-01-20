

import  { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    joined: '',
    streak: 0,
    totalXP: 0,
    league: '',
    topFinishes: 0,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Assume 'userDetails' key
    if (storedUser) {
      setUser({
        name: storedUser.name || 'Default Name',
        username: storedUser.username || 'DefaultUsername',
        joined: storedUser.joined || 'January 2025',
        streak: storedUser.streak || 0,
        totalXP: storedUser.totalXP || 0,
        league: storedUser.league || 'Sapphire',
        topFinishes: storedUser.topFinishes || 0,
      });
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
          <span>{user.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-sm text-gray-400">Joined {user.joined}</p>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Day Streak:</span>
          <span>{user.streak}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total XP:</span>
          <span>{user.totalXP}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Current League:</span>
          <span>{user.league}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Top 3 Finishes:</span>
          <span>{user.topFinishes}</span>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-semibold text-lg">Achievements</h2>
        <p className="text-gray-500">No achievements yet.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
