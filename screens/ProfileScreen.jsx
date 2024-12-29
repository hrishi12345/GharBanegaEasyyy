// import React from 'react';
// import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { logout } from '../utils/store/authSlice';

// const ProfileScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { employee } = route.params;
//   const dispatch=useDispatch()
//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('user');
//       dispatch(logout());  // Call the logout action from Redux to clear state

//       // Reset the navigation to the "Getting Started" screen
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Getting Started' }],
//       });
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const confirmLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Logout', onPress: handleLogout },
//       ],
//       { cancelable: true }
//     );
//   };

//   const renderMenuItem = (iconName, text, onPress = () => {}, notification = false) => (
//     <TouchableOpacity style={styles.menuItem} onPress={onPress}>
//       <Icon name={iconName} size={24} color="#0277D3" />
//       <Text style={styles.menuText}>{text}</Text>
//       {notification && <View style={styles.notification} />}
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileSection}>
//         <Image source={{ uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png' }} style={styles.avatar} />
//         <View style={styles.employeeInfo}>
//           <Text style={styles.employeeName}>{employee.name}</Text>
//           <Text style={styles.employeeDetails}>{employee.id}</Text>
//           <Text style={styles.employeeDetails}>{employee.designation}</Text>
//         </View>
//       </View>

//       <View style={styles.contactInfo}>
//         {renderMenuItem('call-outline', employee.phone)}
//         {renderMenuItem('location-outline', employee.address)}
//       </View>

//       <View style={styles.menuSection}>
//         <Text style={styles.sectionTitle}>Employee Requests</Text>
//         {renderMenuItem('card-outline', 'Payment Requests', true)}
//       </View>

//       <View style={styles.menuSection}>
//         <Text style={styles.sectionTitle}>Settings</Text>
//         {renderMenuItem('person-outline', 'Personal Information')}
//         {renderMenuItem('document-text-outline', 'Terms and Privacy Policy')}
//         {renderMenuItem('help-circle-outline', 'Support')}
//         {renderMenuItem('chatbubble-ellipses-outline', 'FAQs')}
//         {renderMenuItem('log-out-outline', 'Logout', confirmLogout)}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   profileSection: {
//     flexDirection: 'row',
//     padding: 20,
//     borderColor: '#ECECEC',
//     marginTop: 20,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//   },
//   employeeInfo: {
//     justifyContent: 'center',
//   },
//   employeeName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333333',
//     marginBottom: 4,
//   },
//   employeeDetails: {
//     fontSize: 14,
//     color: '#737373',
//     marginBottom: 2,
//   },
//   contactInfo: {
//     padding: 20,
//     borderColor: '#ECECEC',
//   },
//   menuSection: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#737373',
//     marginBottom: 15,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     margin: 10,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#333333',
//     marginLeft: 15,
//     flex: 1,
//     fontFamily: 'Prompt-Medium',
//   },
//   notification: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#FF6B6B',
//   },
// });

// export default ProfileScreen;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Axios for API call
import {useDispatch} from 'react-redux';
import {logout} from '../utils/store/authSlice';
import {API_URL} from '../utils/url';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch user data from /users/info API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Fetch token for authorization
        const response = await axios.get(`${API_URL}/users/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Set user data from API response
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      dispatch(logout()); // Call the logout action from Redux to clear state

      // Reset navigation to "Getting Started" screen
      navigation.reset({
        index: 0,
        routes: [{name: 'Getting Started'}],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: handleLogout},
      ],
      {cancelable: true},
    );
  };

  const renderMenuItem = (
    iconName,
    text,
    onPress = () => {},
    notification = false,
  ) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon name={iconName} size={24} color="#0277D3" />
      <Text style={styles.menuText}>{text}</Text>
      {notification && <View style={styles.notification} />}
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    ); // Display loading state until user data is fetched
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
          }}
          style={styles.avatar}
        />
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>
            {user.fullName || user.firstName}
          </Text>
          <Text style={styles.employeeDetails}>
            ID: {user.supervisorID || user._id}
          </Text>
          <Text style={styles.employeeDetails}>{user.userType}</Text>
        </View>
      </View>

      <View style={styles.contactInfo}>
        {renderMenuItem('call-outline', user.mobile)}
        {renderMenuItem(
          'location-outline',
          `${user.address}, ${user.city}, ${user.state}`,
        )}
      </View>

      <TouchableOpacity
        style={styles.menuSection}
        onPress={() => navigation.navigate('PaymentRequest')}>
        <Text style={styles.sectionTitle}>Employee Requests</Text>
        {renderMenuItem(
          'card-outline',
          'Payment Requests',
          () => navigation.navigate('PaymentRequest'),
          true,
        )}
      </TouchableOpacity>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {renderMenuItem('person-outline', 'Personal Information')}
        {renderMenuItem('document-text-outline', 'Terms and Privacy Policy')}
        {renderMenuItem('help-circle-outline', 'Support')}
        {renderMenuItem('chatbubble-ellipses-outline', 'FAQs')}
        {renderMenuItem('log-out-outline', 'Logout', confirmLogout)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    padding: 20,
    borderColor: '#ECECEC',
    marginTop: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  employeeInfo: {
    justifyContent: 'center',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  employeeDetails: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 2,
  },
  contactInfo: {
    padding: 20,
    borderColor: '#ECECEC',
  },
  menuSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#737373',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
    flex: 1,
    fontFamily: 'Prompt-Medium',
  },
  notification: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
});

export default ProfileScreen;
