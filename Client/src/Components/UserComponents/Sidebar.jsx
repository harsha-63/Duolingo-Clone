import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Sidebar = () => {
  return (
    <div>
      <div className="mb-8">
        <img src={logo} alt="logo" className="w-40 h-10 mx-auto mt-8" />
      </div>
      <ul className="space-y-3">
        <li>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/fbe0c187341c280e161f76fb4cbda1d7.svg"
              alt="Learn"
              className="w-8 h-8"
            />
            <span className="flex items-center">Learn</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sounds"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/3b4928101472fce4e9edac920c1b3817.svg"
              alt="Sounds"
              className="w-8 h-8"
            />
            <span className="flex items-center">Sounds</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/practice"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/882b3d3e43fc041d51f6fc2af496e617.svg"
              alt="Practice"
              className="w-8 h-8"
            />
            <span className="flex items-center">Practice</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/d1f31f71a5b1d513184cc278d910cb33.svg"
              alt="Leaderboard"
              className="w-8 h-8"
            />
            <span className="flex items-center">Leaderboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/quests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/5d2ba4a4504db1b554515043e94cc7da.svg"
              alt="Quests"
              className="w-8 h-8"
            />
            <span className="flex items-center">Quests</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://www.svgrepo.com/show/474358/merchant-shop.svg"
              alt="Shop"
              className="w-8 h-8"
            />
            <span className="flex items-center">Shop</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold rounded-lg font-playpen transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/vendor/e93ac282acf802a6258c761d3e9f9888.svg"
              alt="Profile"
              className="w-8 h-8"
            />
            <span className="flex items-center">Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/more"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mx-4 text-lg font-semibold font-playpen rounded-lg transition ${
                isActive ? 'bg-blue-200 text-blue-400 border-2 border-blue-400' : 'text-gray-500 hover:bg-gray-200'
              }`
            }
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYIHLAcnQ30a5UmI7hvYOE_fTbjuJXk3t5Q&s"
              alt="More"
              className="w-8 h-8"
            />
            <span className="flex items-center">More</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;









  
// https://d35aaqx5ub95lt.cloudfront.net/vendor/3b4928101472fce4e9edac920c1b3817.svg
//https://d35aaqx5ub95lt.cloudfront.net/vendor/882b3d3e43fc041d51f6fc2af496e617.svg
//	https://d35aaqx5ub95lt.cloudfront.net/vendor/d1f31f71a5b1d513184cc278d910cb33.svg
//https://d35aaqx5ub95lt.cloudfront.net/vendor/5d2ba4a4504db1b554515043e94cc7da.svg
//https://d35aaqx5ub95lt.cloudfront.net/vendor/e93ac282acf802a6258c761d3e9f9888.svg