
import Learn from '../../Pages/Learn';
import PracticePage from '../../Pages/Practice';
import Profile from '../../Pages/Profile';
// eslint-disable-next-line react/prop-types
const Content = ({ activeContent }) => {
  return (
    <div>
      {activeContent === 'learn' && (
        <div> 
        <Learn/>
        </div>
      )}
     {activeContent === 'practice' && (
        <div> 
       <PracticePage/>
        </div>
      )}
      {/* {activeContent === 'sounds' && (
        <div> 
        
        </div>
      )} */}
      {/* {activeContent === 'leaderboard' && (
        <div> 
       <Lea
        </div>
      )} */}
      {/* {activeContent === 'quests' && (
        <div> 
        <Learn/>
        </div>
      )} */}
      {activeContent === 'profile' && (
        <div>
          <Profile/>
          
        </div>
      )}

      
    </div>
  );
};

export default Content;
