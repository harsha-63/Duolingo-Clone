import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Sidebar = () => {
  const menuItems = [
    { label: 'Learn', icon: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/fbe0c187341c280e161f76fb4cbda1d7.svg', to: '/learn' },
    { label: 'Sounds', icon: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/3b4928101472fce4e9edac920c1b3817.svg', to: '/sounds' },
    { label: 'Practice', icon: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/882b3d3e43fc041d51f6fc2af496e617.svg', to: '/practice' },
    { label: 'Leaderboard', icon: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/d1f31f71a5b1d513184cc278d910cb33.svg', to: '/leaderboard' },
    { label: 'Quests', icon: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/5d2ba4a4504db1b554515043e94cc7da.svg', to: '/quests' },
    { label: 'Shop', icon: 'https://www.svgrepo.com/show/474358/merchant-shop.svg', to: '/shop' },
    { label: 'Profile', icon: 'https://d35aaqx5ub95lt.cloudfront.net/vendor/e93ac282acf802a6258c761d3e9f9888.svg', to: '/profile' },
    { label: 'More', icon: '/path/to/more-options-icon.svg', to: '/more' }
  ];

  return (
    <div>
      <div className="mb-8">
        <img src={logo} alt="logo" className="w-44 h-12 mx-auto mt-8" />
      </div>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className=" flex items-center gap-3 px-4 py-2  mx-4  text-lg text-gray-500 font-semibold rounded-lg hover:bg-gray-200 transition"
              activeClassName="bg-blue-200"
            >
              <img src={item.icon} alt={item.label} className="w-10 h-10" />
              <span className="flex items-center">{item.label}</span>
            </NavLink>
          </li>
        ))}
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