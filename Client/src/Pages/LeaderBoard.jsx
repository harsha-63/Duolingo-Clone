import { useEffect, useState, useContext } from 'react';
import { Trophy, Medal } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext' // Adjust this path as needed

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllUsers } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const getRankDisplay = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-gray-500 font-mono">{rank}</span>;
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">XP Leaderboard</h2>
        <div className="text-center text-gray-500 py-8">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">XP Leaderboard</h2>
        <div className="text-center text-red-500 py-8">
          {error}
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">XP Leaderboard</h2>
        <div className="text-center text-gray-500 py-8">
          No users found
        </div>
      </div>
    );
  }

  const rankedUsers = [...users]
    .sort((a, b) => b.xpPoints - a.xpPoints)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">XP Leaderboard</h2>
      <div className="space-y-2">
        {rankedUsers.map((user) => (
          <div
            key={user.id || `user-${user.rank}`}
            className={`flex items-center p-4 rounded-lg ${
              user.rank <= 3 ? 'bg-gray-100' : ''
            } hover:bg-gray-50 transition-colors`}
          >
            <div className="w-12 flex justify-center">
              {getRankDisplay(user.rank)}
            </div>
            <div className="flex items-center flex-1">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {getInitials(user.name)}
              </div>
              <div className="ml-4">
                <div className="font-semibold">{user.name || 'Unknown User'}</div>
                <div className="text-sm text-gray-500">
                  XP: {(user.xpPoints || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;