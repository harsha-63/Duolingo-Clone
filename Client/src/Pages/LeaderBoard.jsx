import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllUsers, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setError('Fetched data is not in expected format (users is not an array)');
        }
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
        return <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9e4f18c0bc42c7508d5fa5b18346af11.svg" alt="Gold Medal" className="h-8 w-8 md:h-10 md:w-10 text-yellow-500" />;
      case 2:
        return <img src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/cc7b8f8582e9cfb88408ab851ec2e9bd.svg' alt='silver' className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />;
      case 3:
        return <img src='https://d35aaqx5ub95lt.cloudfront.net/images/leagues/eef523c872b71178ef5acb2442d453a2.svg' alt='bronze' className="h-8 w-8 md:h-10 md:w-10 text-amber-600" />;
      default:
        return <span className="text-lime-500 text-sm md:text-lg font-mono">{rank}</span>;
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

  const getLeague = (points) => {
    if (points >= 500) return 'gold';
    if (points >= 300) return 'silver';
    if (points >= 100) return 'bronze';
    return 'copper';
  };

  const getLeagueName = () => {
    const userPoints = user?.xpPoints || 0;
    if (userPoints >= 500) return "Gold League";
    if (userPoints >= 300) return "Silver League";
    if (userPoints >= 100) return "Bronze League";
    return "Copper League";
  };

  const leagues = [
    { name: 'bronze', imgUrl: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/838ba65643baef4c8442317df514cab5.svg' },
    { name: 'silver', imgUrl: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/968f56b566887d7718898cf8b5e74f40.svg' },
    { name: 'gold', imgUrl: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/0e249b5f869b806da7406b815f4d60c6.svg' },
    { name: 'sapphire', imgUrl: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/1b4fb092de75e4ecefd8e92f10b4ddd2.svg' },
    { name: 'ruby', imgUrl: 'https://d35aaqx5ub95lt.cloudfront.net/images/leagues/1b4fb092de75e4ecefd8e92f10b4ddd2.svg' },
  ];

  if (loading) {
    return <div className="text-center text-gray-500 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="text-center text-gray-500 py-8">No users found</div>;
  }

  const rankedUsers = [...users]
    .sort((a, b) => b.xpPoints - a.xpPoints)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  const currentLeague = getLeague(user?.xpPoints || 0);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 max-md:mt-16">
      <div className='  border-b-2 border-gray-400  overflow-x-auto'>
      {/* League Section */}
      <div className="flex flex-nowrap justify-center items-center gap-2 mb-4 p-4 md:p-2">
        {leagues.map((league) => (
          <div
            key={league.name}
            className={`
              w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center 
              ${currentLeague === league.name ? 'scale-110 ring-2 ring-yellow-500' : 'opacity-70'}
            `}
          >
            <img src={league.imgUrl} alt={`${league.name} league`} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
          </div>
        ))}
      </div>

      {/* League Name */}
      <div className="text-center mb-6 mt-8" >
        <h2 className="text-xl md:text-2xl font-bold font-playpen text-gray-800 mb-2">{getLeagueName()}</h2>
        <p className="text-gray-600 text-sm md:text-base">Top 10 advance to the next league</p>
        <p className="text-yellow-500 font-semibold mt-1 text-sm md:text-base">5 days</p>
      </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
        {rankedUsers.map((user) => (
          <div
            key={user.id || `user-${user.rank}`}
            className="flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-8 md:w-12 flex justify-center">
                {getRankDisplay(user.rank)}
              </div>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {getInitials(user.username)}
              </div>
              <div className="font-semibold text-sm md:text-base text-gray-500">
                {user.username.toUpperCase() || 'Unknown User'}
              </div>
            </div>

            <div className="text-xs md:text-sm text-gray-500 font-semibold">
              {(user.xpPoints || 0).toLocaleString()} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;


