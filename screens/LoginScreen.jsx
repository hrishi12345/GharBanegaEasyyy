import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../utils/store/authSlice';
import { sendOTP, verifyOTP } from '../utils/api/auth';

export default function LoginScreen({ navigation }) {
  const [userCode, setUserCode] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSendOTP = async () => {
    if (!userCode) {
      Alert.alert('Error', 'Please enter your Client ID');
      return;
    }
    setIsLoading(true);
    try {
      await sendOTP(userCode);
      setOtpSent(true);
      Alert.alert('Success', 'OTP has been sent to your registered mobile number');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyOTP(userCode, otp);
      if (response.success) {
        const { user, token } = response.data;
        
        await dispatch(setUser(user));
        await dispatch(setToken(token));
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', token);
        
        // Instead of navigation.reset(), use navigation.navigate()
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Employee Login</Text>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/glgqubez9cd-26%3A1879?alt=media&token=1864e7d9-3e15-48f2-a021-b111cb292871',
          }}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <Text style={styles.label}>Employee Id</Text>
          <TextInput
  style={styles.input}
  placeholder="Enter your Client ID"
  value={userCode}
  onChangeText={(text) => setUserCode(text.toUpperCase())} // Convert input to uppercase
  autoCapitalize="characters" // Automatically capitalize all characters
/>


          {otpSent && (
            <>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />
            </>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={otpSent ? handleVerifyOTP : handleSendOTP}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Loading...' : otpSent ? 'Verify OTP' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(254,254,254,1)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: '#0277D3',
    fontSize: 24,
    fontFamily: "Prompt-Medium",
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: 'rgba(140,139,136,1)',
    fontSize: 14,
    fontFamily: "Prompt-Medium",
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(140,139,136,0.5)',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0277D3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    fontFamily: "Prompt-Medium",
  },
});
