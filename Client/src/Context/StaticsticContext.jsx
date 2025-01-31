import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';


// eslint-disable-next-line react-refresh/only-export-components
export const UserStatisticsContext = createContext();

// eslint-disable-next-line react/prop-types
const UserStatisticsProvider = ({ children }) => {
  const initialUserStats = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return {
        life: typeof user?.life === 'number' ? user.life : 5,
        gems: typeof user?.gems === 'number' ? user.gems : 50,
        xpPoints:typeof user?.xpPoints ==='number' ? user.xpPoints:200
      };
    } catch {
      return { life: 5, gems: 50 ,xpPoints:200 };
    }
  };

  const [userStats, setUserStats] = useState(initialUserStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserId = useCallback(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.id || null;
    } catch {
      return null;
    }
  }, []);

  const updateLocalStorage = useCallback((newStats) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = { ...currentUser, ...newStats };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }, []);

  const updateStats = useCallback((newStats) => {
    setUserStats(prev => {
      const updatedStats = { ...prev, ...newStats };
      updateLocalStorage(updatedStats);
      return updatedStats;
    });
  }, [updateLocalStorage]);

  const reduceLife = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User ID not found');

      const response = await axios.post( `${import.meta.env.VITE_API_URL}/user/reduce`, {
        userId: userId,
      });
      
      const newStats = { life: response.data.life };
      updateStats(newStats);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reduce life';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getUserId, updateStats]);

  const refillLife = useCallback(async () => {
    if (userStats.life > 0) return; 
    
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User ID not found');

      const response = await axios.post( `${import.meta.env.VITE_API_URL}/user/refill`, {
        userId: userId,
      });
      
      const newStats = { life: response.data.life };
      updateStats(newStats);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to refill life';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getUserId, updateStats, userStats.life]);

  const rewardGems = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User ID not found');

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/reward`, {
        userId: userId,
      });
      
      const newStats = { gems: response.data.gems };
      updateStats(newStats);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reward gems';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getUserId, updateStats]);


  const xpPoints = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User ID not found');

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/xpPoints`, {
        userId: userId,
      });
      
      const newStats = { xpPoints: response.data.xpPoints };
      updateStats(newStats);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get xpPoints';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getUserId, updateStats]);

 
    


  useEffect(() => {
    const handleStorageChange = () => {
      const newStats = initialUserStats();
      setUserStats(newStats);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    userStats,
    loading,
    error,
    reduceLife,
    refillLife,
    rewardGems,
    xpPoints
  };

  return (
    <UserStatisticsContext.Provider value={value}>
      {children}
    </UserStatisticsContext.Provider>
  );
};

export default UserStatisticsProvider;



