import  { createContext, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const UserStatisticsContext = createContext();

// eslint-disable-next-line react/prop-types
const UserStatisticsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    life: 5,
    gems: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || null;
  };

  const reduceLife = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:4000/user/reduce', {
        userId: getUserId()
      });
      
      setUserStats(prev => ({
        ...prev,
        life: response.data.life
      }));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reduce life');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refillLife = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:4000/user/refill', {
        userId: getUserId()
      });
      
      setUserStats(prev => ({
        ...prev,
        life: response.data.life,
        gems: response.data.gems
      }));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to refill life');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const rewardGems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:4000/user/reward', {
        userId: getUserId()
      });
      
      setUserStats(prev => ({
        ...prev,
        gems: response.data.gems
      }));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reward gems');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    userStats,
    loading,
    error,
    reduceLife,
    refillLife,
    rewardGems,
  };

  return (
    <UserStatisticsContext.Provider value={value}>
      {children}
    </UserStatisticsContext.Provider>
  );
};

export default UserStatisticsProvider;
