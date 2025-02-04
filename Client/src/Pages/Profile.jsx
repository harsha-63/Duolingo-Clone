import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Pencil, ChevronRight } from 'lucide-react';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-start p-4 md:p-8 min-h-screen font-playpen text-gray-500">
      <div className="flex flex-col items-start w-full">
        <div className="relative w-full max-w-2xl h-auto md:h-56 bg-blue-50 rounded-lg flex items-center justify-center mb-4 p-4 max-md:mt-16 max-md:h-48">
          <div className="w-24 md:w-32 h-24 md:h-32 flex items-center justify-center">
            <img src='https://d35aaqx5ub95lt.cloudfront.net/images/7a24dbe6c243d2bbf8b6c8aad73dc941.svg' alt='' className='w-72 h-64 max-md:w-80 max-md:h-72'/>
          </div>
          
          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/80 backdrop-blur"
            onClick={() => alert("Edit profile picture functionality")}
          >
            <Pencil className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
          <p className="text-sm text-gray-500">Joined {user?.createdAt}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 w-full">
          <span className="text-blue-500 text-base font-medium">0 Following</span>
          <span className="text-blue-500 text-base font-medium">0 Followers</span>
          <span className="ml-0 md:ml-20">
            <img src='https://d35aaqx5ub95lt.cloudfront.net/images/borderlessFlags/b9817d83179e278c91771d903953bfc6.svg' alt='' className='w-8 h-8'/>
          </span>
        </div>
      </div>

      <div className="mt-7 w-full">
        <h1 className="text-xl font-semibold mb-4">Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Day Streak</div>
            <div className="text-xl font-bold">{user?.streak || 0}</div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Total XP</div>
            <div className="text-xl font-bold">
              {user?.xpPoints ? user.xpPoints.toLocaleString() : 0}
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Current League</div>
            <div className="text-xl font-bold">{user?.league || 'None'}</div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm">Top 3 Finishes</div>
            <div className="text-xl font-bold">{user?.topFinishes || 0}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Achievements</h1>
          <button className="text-blue-500 font-medium flex items-center">
            VIEW ALL
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white shadow-md p-4 rounded-lg">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
              🔥
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Wildfire</h2>
                <span className="text-sm text-gray-400">0/3</span>
              </div>
              <p className="text-sm text-gray-500">Reach a 3 day streak</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div className="bg-gray-200 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                  LEVEL 1
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white shadow-md p-4 rounded-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              🧙
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Sage</h2>
                <span className="text-sm text-gray-400">0/100</span>
              </div>
              <p className="text-sm text-gray-500">Earn 100 XP</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div className="bg-gray-200 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                  LEVEL 1
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white shadow-md p-4 rounded-lg">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
              📜
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Scholar</h2>
                <span className="text-sm text-gray-400">0/50</span>
              </div>
              <p className="text-sm text-gray-500">Learn 50 new words in a single course</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div className="bg-gray-200 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                  LEVEL 1
                </span>
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
