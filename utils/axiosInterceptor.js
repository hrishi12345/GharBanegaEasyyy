import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './navigationRef'; // We'll create this

let navigationInstance = null;

export const setupAxiosInterceptor = (navigation) => {
  navigationInstance = navigation;
  
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 403) {
        // Clear all stored data
        try {
          await AsyncStorage.clear();
          
          // Navigate to Getting Started screen
          if (navigationRef.current) {
            navigationRef.current.reset({
              index: 0,
              routes: [{ name: 'GettingStarted' }],
            });
          }
        } catch (clearError) {
          console.error('Error clearing storage:', clearError);
        }
      }
      return Promise.reject(error);
    }
  );
};

