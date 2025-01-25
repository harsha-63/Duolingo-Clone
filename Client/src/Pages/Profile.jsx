import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-start p-8 min-h-screen">
      {/* Profile Section */}
      <div className="flex flex-col items-start">
        {/* Profile Picture */}
        <div className="relative w-[660px] h-52 bg-gray-200 flex items-center justify-center mb-4">
  {/* Profile Picture */}
  <img
    src={`/api/placeholder/120/120`}
    alt="Profile"
    className="w-32 h-32 "
  />
  
  {/* Edit Icon */}
          <button
            className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
            onClick={() => alert("Edit profile picture functionality")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 11.232l6.232-6.232 3.536 3.536-6.232 6.232H9v-3.536z"
              />
            </svg>
          </button>
        </div>


        {/* Username and Join Date */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
          <p className="text-sm text-gray-500">Joined {user?.createdAt}</p>
        </div>

        {/* Followers and Following */}
        <div className="flex space-x-8 mt-4">
          <span className="text-blue-500 text-base font-medium">0 Following</span>
          <span className="text-blue-500 text-base font-medium">0 Followers</span>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-7 w-full">
        <h1 className="text-xl font-semibold mb-4">Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Day Streak */}
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Day Streak</div>
            <div className="text-xl font-bold">{user?.streak || 0}</div>
          </div>

          {/* Total XP */}
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Total XP</div>
            <div className="text-xl font-bold">
              {user?.totalXp ? user.totalXp.toLocaleString() : 0}
            </div>
          </div>

          {/* Current League */}
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Current League</div>
            <div className="text-xl font-bold">{user?.currentLeague || 'None'}</div>
          </div>

          {/* Top 3 Finishes */}
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Top 3 Finishes</div>
            <div className="text-xl font-bold">{user?.topFinishes || 0}</div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-8 w-full">
        <h1 className="text-xl font-semibold mb-4">Achievements</h1>
        <div className="space-y-4">
          {/* Achievement 1 */}
          <div className="flex items-center space-x-4 bg-white shadow-md p-4 rounded-lg">
            <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center">
              🔥
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Wildfire</h2>
                <span className="text-sm text-gray-500">6/7</span>
              </div>
              <p className="text-sm text-gray-500">Reach a 7 day streak</p>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: '85%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="flex items-center space-x-4 bg-white shadow-md p-4 rounded-lg">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
              🧙
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Sage</h2>
                <span className="text-sm text-gray-500">2383/4000</span>
              </div>
              <p className="text-sm text-gray-500">Earn 4000 XP</p>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Achievement 3 */}
          <div className="flex items-center space-x-4 bg-white shadow-md p-4 rounded-lg">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center">
              📜
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Scholar</h2>
                <span className="text-sm text-gray-500">76/100</span>
              </div>
              <p className="text-sm text-gray-500">
                Learn 100 new words in a single course
              </p>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: '76%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;







// const Profile = () => {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile
