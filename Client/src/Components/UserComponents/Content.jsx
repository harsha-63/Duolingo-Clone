import Learn from '../../Pages/Learn';
import PracticePage from '../../Pages/Practice';
import Profile from '../../Pages/Profile';
import Sounds from '../../Pages/Sounds';
import Leaderboard from '../../Pages/LeaderBoard'; 
import Quests from '../../Pages/Quests'; 
import Shop from '../../Pages/Shop'; 

// eslint-disable-next-line react/prop-types
const Content = ({ activeContent }) => {
  return (
    <div>
      {activeContent === 'learn' && (
        <div> 
          <Learn />
        </div>
      )}
      {activeContent === 'practice' && (
        <div> 
          <PracticePage />
        </div>
      )}
      {activeContent === 'sounds' && (
        <div> 
          <Sounds />
        </div>
      )}
      {activeContent === 'leaderboard' && (
        <div> 
          <Leaderboard />
        </div>
      )}
      {activeContent === 'quests' && (
        <div> 
          <Quests />
        </div>
      )}
      {activeContent === 'shop' && (
        <div>
          <Shop />
        </div>
      )}
      {activeContent === 'profile' && (
        <div>
          <Profile />
        </div>
      )}
    </div>
  );
};

export default Content;

