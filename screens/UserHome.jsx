// import React, { useState } from 'react';
// import { ScrollView, View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import moment from 'moment';

// import HomeHeaderSearch from '../components/SearchBar/HomeHeaderSearch';
// import InventoryManagementCard from '../components/InventoryManagement/InventoryManagement';
// import ProjectManagementCard from '../components/ProjectManagement/ProjectManagement';
// import AttendanceManagementCard from '../components/AttendanceManagement/AttendanceManagement';
// import ProgressManagementCard from '../components/ProgressManagement/Progressmanagement';
// import TabBar from '../components/Tabs/TabBar';
// import SuperVisorAttendanceCard from '../components/AttendanceManagement/SuperVisorAttendanceCard';

// import { setAttendances, setContractorInventory, setProjects, setProjectsProgress, setWorkerrCount } from '../utils/store/projectSlice';
// import { API_URL } from '../utils/url';
// import CircleWithImageIcon from '../assests/CircleWithImageIcon';
// import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import PaymentCard from '../components/PaymentManagement/PaymentCard';
// import ProjectDetailsCard from '../components/ProjectManagement/ProjectDetailsCard';
// import PaymentManagementCard from '../components/PaymentManagement/PaymentCard';

// const UserHome = () => {
// //   const dispatch = useDispatch();
// //   const navigation = useNavigation();

// //   const { token, isAuthenticated } = useSelector((state) => state.auth);
// //   console.log(token)
// //   const userRole = useSelector((state) => state.auth.user?.userType);
// //   const homeData = useSelector((state) => state.projects);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [count,setCount]=useState(0)
// //   useFocusEffect(
// //     React.useCallback(() => {
// //       const fetchHomeData = async () => {
// //         if (!isAuthenticated || !token) {
// //           navigation.navigate('Login');
// //           return;
// //         }

// //         setIsLoading(true);
// //         const today = moment().format('YYYY-MM-DD');

// //         try {
// //           let response;
// //           if (userRole === 'admin' || userRole === 'Admin' || userRole === 'Supervisor') {
// //             response = await axios.get(`${API_URL}/users/supervisor/projects`, {
// //               headers: { Authorization: `Bearer ${token}` },
// //               params: { date: today },
// //             });
// //           } else {
// //             response = await axios.get(`${API_URL}/users/projects`, {
// //               headers: { Authorization: `Bearer ${token}` },
// //               params: { date: today },
// //             });
// //           }

// //           if (response?.data?.success) {
           
// //             const { projects, contractorInventory, projectsProgress, attendances,workersCount } = response.data.data;
// //             console.log('homescree',response?.data);
// //             dispatch(setProjects(projects));
// //             dispatch(setContractorInventory(contractorInventory));
// //             dispatch(setProjectsProgress(projectsProgress));
// //             dispatch(setAttendances(attendances));
// //             dispatch(setWorkerrCount(workersCount)); // Use Redux to store count
// //     setCount(workersCount); // Local state as fallback
// //           }
// //         } catch (error) {
// //           console.error('Error fetching home data:', error?.response?.status);
// //           if (error?.response?.status === 401 || error?.response?.status === 403) {
// //             handleTokenExpiration();
// //           } else {
// //             Alert.alert('Error', 'An error occurred while fetching home data.');
// //           }
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       };

// //       fetchHomeData();
// //     }, [isAuthenticated, token, userRole, dispatch, navigation])
// //   );

// //   const handleTokenExpiration = () => {
// //     AsyncStorage.removeItem('token');
// //     AsyncStorage.removeItem('user');
// //     navigation.reset({
// //       index: 0,
// //       routes: [{ name: 'Login' }],
// //     });
// //   };

//   return (
//     <View style={styles.container}>
      
//         <ScrollView
//           contentContainerStyle={styles.scrollViewContent}
//           showsVerticalScrollIndicator={false}>
//             {/* {userRole === 'admin' || userRole === 'Admin'? (
//               <TouchableOpacity
//                 style={styles.tab}
//                 onPress={() => {
//                   navigation.navigate('Profile');
//                 }}>
//                 <CircleWithImageIcon
//                   size={responsiveFontSize(3.5)}
//                   color="white"
//                   imageUri="https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png"
//                 />
//               </TouchableOpacity>
//             ) : null} */}
            
//           <ProjectManagementCard />
          
//            <PaymentManagementCard />
//            <ProjectDetailsCard />
        
//           <View style={{ height: 80 }} />
//         </ScrollView>
    
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
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tab:{
//     alignSelf:'flex-end',
//     borderWidth:0.5,
//     borderRadius:10
//   }
// });

// export default UserHome;
// // 
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import ProjectManagementCard from '../components/ProjectManagement/ProjectManagement';
import PaymentManagementCard from '../components/PaymentManagement/PaymentCard';
import ProjectDetailsCard from '../components/ProjectManagement/ProjectDetailsCard';

import { setProjects } from '../utils/store/projectSlice';
import { API_URL } from '../utils/url';

const UserHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);

  
useFocusEffect(
  React.useCallback(() => {
    const fetchClientProjects = async () => {
      if (!isAuthenticated || !token) {
        navigation.navigate('Login');
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get('http://3.110.171.43:5000/api/users/client/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.status === 200) {
          const { projects, invoices: fetchedInvoices } = response.data.data;
          console.log('clientProjects', projects);
          console.log('invoices', fetchedInvoices);
         
          setProjects(projects);
          setInvoices(fetchedInvoices); // Store invoices
        } else {
          Alert.alert('Error', 'Failed to fetch client projects');
        }
      } catch (error) {
        console.error('Error fetching client projects:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleTokenExpiration();
        } else {
          Alert.alert('Error', 'An error occurred while fetching client projects.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientProjects();
  }, [isAuthenticated, token, dispatch, navigation])
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
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <ProjectManagementCard projects={projects} />
          <PaymentManagementCard invoices={invoices} />
          <ProjectDetailsCard />
          <View style={{ height: 80 }} />
        </ScrollView>
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
});

export default UserHome;
