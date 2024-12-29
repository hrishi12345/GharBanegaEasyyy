import axios from 'axios';
import { API_URL } from '../url';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const sendOTP = async userCode => {
  try {
    const response = await axios.post(`${API_URL}/users/send-otp`, {userCode});
    return response.data;
  } catch (error) {
    console.error('Error:', error.message || error.response.data);
    throw error.response.data || new Error(error.message);
  }
};

export const verifyOTP = async (userCode, otp) => {
  try {
    if (typeof userCode !== 'string') {
      throw new Error('Invalid type for userCode. Expected a string.');
    }
    if (typeof otp !== 'string') {
      throw new Error('Invalid type for OTP. Expected a string.');
    }

    console.log('Sending data:', {userCode, otp}); // Log the request data
    console.log(`${API_URL}/verify-user`);
    const response = await axios.post(`${API_URL}/users/verify-user`, {
      userCode,
      otp,
    });
    console.log('admin',response.data)
    return response.data;
  } catch (error) {
    console.error('Error:', error.message || error.response.data);
    throw error.response.data || new Error(error.message);
  }
};

// utils/authUtils.js


export const handleTokenExpiration = (navigation) => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
};
