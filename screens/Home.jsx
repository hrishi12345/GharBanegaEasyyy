// import React from 'react';
// import { ScrollView, View, StyleSheet } from 'react-native';
// import ProjectManagementCard from '../components/ProjectManagement/ProjectManagement';
// import AttendanceManagementCard from '../components/AttendanceManagement/AttendanceManagement';
// import ProgressManagementCard from '../components/ProgressManagement/Progressmanagement';
// import TabBar from '../components/Tabs/TabBar';
// import InventoryManagementCard from '../components/InventoryManagement/InventoryManagement';

// const Home = () => {
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}
//         horizontal={false}
//       >
//         <ProjectManagementCard />
//         <InventoryManagementCard />
//         <ProgressManagementCard />
//         <AttendanceManagementCard />
//       </ScrollView>
//       <TabBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingBottom: 16,
//   },
// });

// export default Home;



// import React, {useEffect, useState} from 'react';
// import {ScrollView, View, StyleSheet, Alert} from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import HomeHeaderSearch from '../components/SearchBar/HomeHeaderSearch';
// import InventoryManagementCard from '../components/InventoryManagement/InventoryManagement';
// import ProjectManagementCard from '../components/ProjectManagement/ProjectManagement';
// import AttendanceManagementCard from '../components/AttendanceManagement/AttendanceManagement';
// import ProgressManagementCard from '../components/ProgressManagement/Progressmanagement';
// import TabBar from '../components/Tabs/TabBar';
// import moment from 'moment';
// import {useNavigation} from '@react-navigation/native';

// const API_URL = 'http://3.110.171.43:5000/api';

// const Home = () => {
//   const [homeData, setHomeData] = useState({
//     projects: [],
//     contractorInventory: [],
//     projectsProgress: [],
//     attendances: [],
//   });

//   const navigation = useNavigation();

//   useEffect(() => {
//     const today = moment().format('YYYY-MM-DD');
//     fetchHomeData(today);
//   }, []);

//   const fetchHomeData = async date => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log(token);
//       if (token) {
//         const response = await axios.get(`${API_URL}/users/projects`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             date: date,
//           },
//         });
//         if (response.data.success) {
//           setHomeData(response.data.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching home data:', error.response?.status);
      
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         handleTokenExpiration();
//       } else {
//         Alert.alert('Error', 'An error occurred while fetching home data.');
//       }
//     }
//   };

//   const handleTokenExpiration = async () => {
//     try {
//       await AsyncStorage.removeItem('token');
//       navigation.navigate('Getting Started');
//     } catch (error) {
//       console.error('Error removing token:', error);
//       Alert.alert('Error', 'Failed to remove expired token. Please try logging out manually.');
//     }
//   };

//   console.log(homeData.contractorInventory);
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}
//         horizontal={false}>
//         <ProjectManagementCard projects={homeData.projects} />
//         <InventoryManagementCard inventory={homeData.contractorInventory} />
//         <ProgressManagementCard progress={homeData.projectsProgress} />
//         <AttendanceManagementCard attendances={homeData.attendances} />
//       </ScrollView>
//       <TabBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingBottom: 16,
//   },
// });

// export default Home;




// import React from 'react';
// import { ScrollView, View, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ProjectManagementCard from '../components/ProjectManagement/ProjectManagement';
// import InventoryManagementCard from '../components/InventoryManagement/InventoryManagement';
// import ProgressManagementCard from '../components/ProgressManagement/Progressmanagement';
// import AttendanceManagementCard from '../components/AttendanceManagement/AttendanceManagement';
// import TabBar from '../components/Tabs/TabBar';
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAttendances, setContractorInventory, setProjects, setProjectsProgress } from '../utils/store/projectSlice';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { API_URL } from '../utils/url';

// const Home = () => {
//   const dispatch = useDispatch();
//   const homeData = useSelector((state) => state.projects);
//   const navigation = useNavigation();

//   const fetchHomeData = async (date) => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (token) {
//         const response = await axios.get(`${API_URL}/users/projects`, {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { date: date },
//         });
//         if (response.data.success) {
//           dispatch(setProjects(response.data.data.projects));
//           dispatch(setContractorInventory(response.data.data.contractorInventory));
//           dispatch(setProjectsProgress(response.data.data.projectsProgress));
//           dispatch(setAttendances(response.data.data.attendances));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching home data:', error.response?.status);
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         handleTokenExpiration();
//       } else {
//         Alert.alert('Error', 'An error occurred while fetching home data.');
//       }
//     }
//   };

//   const handleTokenExpiration = async () => {
//     try {
//       await AsyncStorage.removeItem('token');
//       navigation.navigate('Getting Started');
//     } catch (error) {
//       console.error('Error removing token:', error);
//       Alert.alert('Error', 'Failed to remove expired token. Please try logging out manually.');
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       const today = moment().format('YYYY-MM-DD');
//       fetchHomeData(today);

//       return () => {
//         // Optional cleanup function
//       };
//     }, [])
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} horizontal={false}>
//         <ProjectManagementCard projects={homeData.projects} />
//         <InventoryManagementCard inventory={homeData.contractorInventory} />
//         <ProgressManagementCard progress={homeData.projectsProgress} />
//         <AttendanceManagementCard attendances={homeData.attendances} />
//       </ScrollView>
//       <TabBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingBottom: 16,
//   },
// });

// export default Home;
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';

import HomeHeaderSearch from '../components/SearchBar/HomeHeaderSearch';
import InventoryManagementCard from '../components/InventoryManagement/InventoryManagement';
import ProjectManagementCard from '../components/ProjectManagement/ProjectManagement';
import AttendanceManagementCard from '../components/AttendanceManagement/AttendanceManagement';
import ProgressManagementCard from '../components/ProgressManagement/Progressmanagement';
import TabBar from '../components/Tabs/TabBar';
import SuperVisorAttendanceCard from '../components/AttendanceManagement/SuperVisorAttendanceCard';

import { setAttendances, setContractorInventory, setProjects, setProjectsProgress, setWorkerrCount } from '../utils/store/projectSlice';
import { API_URL } from '../utils/url';
import CircleWithImageIcon from '../assests/CircleWithImageIcon';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import UserHome from './UserHome';
import TabBar2 from '../components/Tabs/Tabbar2';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(userRole)
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  console.log(token)
  const userRole = useSelector((state) => state.auth.user?.userType);
  const homeData = useSelector((state) => state.projects);
  const [isLoading, setIsLoading] = useState(false);
  const [count,setCount]=useState(0)
  useFocusEffect(
    React.useCallback(() => {
      const fetchHomeData = async () => {
        if (!isAuthenticated || !token) {
          navigation.navigate('Login');
          return;
        }
  
        setIsLoading(true);
        const today = moment().format('YYYY-MM-DD');
  
        try {
          let response;
          if (userRole === 'admin' || userRole === 'Admin' || userRole === 'Supervisor') {
            response = await axios.get(`${API_URL}/users/supervisor/projects`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { date: today },
            });
          } else if (userRole === 'Client') {
            response = await axios.get(`${API_URL}/users/client/projects`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            response = await axios.get(`${API_URL}/users/projects`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { date: today },
            });
          }
  
          if (response?.data?.success) {
            const { projects, contractorInventory, projectsProgress, attendances, workersCount } = response.data.data;
            console.log('response data',response.data)
            dispatch(setProjects(projects));
            dispatch(setContractorInventory(contractorInventory));
            dispatch(setProjectsProgress(projectsProgress));
            dispatch(setAttendances(attendances));
            dispatch(setWorkerrCount(workersCount)); // Use Redux to store count
            setCount(workersCount); // Local state as fallback
          }
        } catch (error) {
          console.error('Error fetching home data:', error?.response?.status);
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            handleTokenExpiration();
          } else {
            Alert.alert('Error', 'An error occurred while fetching home data.');
          }
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchHomeData();
    }, [isAuthenticated, token, userRole, dispatch, navigation])
  );
  

  const handleTokenExpiration = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
        {userRole === 'Client' ? (
          <>
          <UserHome />
          <TabBar2 />
          </>
        ) : 
        <>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}>
            {userRole === 'admin' || userRole === 'Admin'? (
              <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <CircleWithImageIcon
                  size={responsiveFontSize(3.5)}
                  color="white"
                  imageUri="https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png"
                />
              </TouchableOpacity>
            ) : null}
            
          <ProjectManagementCard projects={homeData.projects} />
          <InventoryManagementCard inventory={homeData.contractorInventory} />
          <ProgressManagementCard progress={homeData.projectsProgress} />

          {userRole === 'Supervisor' ? (
             <SuperVisorAttendanceCard attendances={homeData.attendances} count={count} />
          ) : userRole === 'Internal User' ? (
            <AttendanceManagementCard attendances={homeData.attendances} />
          ) :  <SuperVisorAttendanceCard attendances={homeData.attendances} count={count} />}

          <View style={{ height: 80 }} />
         
        </ScrollView>
         <TabBar />
         </>
        }
      
        </>
      )}
      
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab:{
    alignSelf:'flex-end',
    borderWidth:0.5,
    borderRadius:10
  }
});

export default Home;
