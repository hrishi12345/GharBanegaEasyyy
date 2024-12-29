// // import React, { useState } from "react";
// // import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// // import { responsiveWidth } from "react-native-responsive-dimensions";

// // import WorkersList from "../components/AttendanceManagement/WorkersList";
// // import TodaysAttendance from "../components/AttendanceManagement/TodaysAttendace";
// // import BackIcon from "../assests/BackIcon";
// // import { useNavigation } from "@react-navigation/native";

// // export default function AttendanceManagement() {
// //   const [activeTab, setActiveTab] = useState("attendance");

// //   const project = {
// //     name: "City Center Mall Expansion",
// //     site: "Downtown Plaza",
// //     description: "Expanding the existing mall with a new wing and modernizing the food court area."
// //   };
// //   const navigation=useNavigation()
// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.headerContainer}>
// //       <TouchableOpacity onPress={() => navigation.goBack()}>
// //                 <BackIcon />
// //             </TouchableOpacity>
// //         <Text style={styles.mainHeader}>Attendance Management</Text>
// //       </View>
// //       <View style={styles.projectInfo}>
// //         <Text style={styles.projectName}>{project.name}</Text>
// //         <Text style={styles.projectSite}>Site: {project.site}</Text>
// //         <Text style={styles.projectDescription}>{project.description}</Text>
// //       </View>

// //       <View style={styles.attendanceHeader}>
// //         <TouchableOpacity
// //           style={[styles.tab, activeTab === "attendance" && styles.activeTab]}
// //           onPress={() => setActiveTab("attendance")}
// //         >
// //           <Text style={[styles.tabText, activeTab === "attendance" && styles.activeTabText]}>Today's Attendance</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={[styles.tab, activeTab === "workers" && styles.activeTab]}
// //           onPress={() => setActiveTab("workers")}
// //         >
// //           <Text style={[styles.tabText, activeTab === "workers" && styles.activeTabText]}>Workers List</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {activeTab === "attendance" ? <TodaysAttendance /> : <WorkersList />}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#FEFEFE",
// //     paddingTop: 34,
// //     marginHorizontal: responsiveWidth(2),
// //   },
// //   headerContainer: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: 30,
// //     marginRight: responsiveWidth(5),
// //     marginBottom: 20,
// //   },
// //   mainHeader: {
// //     fontSize: 18,
// //     fontWeight: "500",
// //     color: "#333333",
// //     textAlign: "center",
// //     marginVertical: 16,
// //   },
// //   projectInfo: {
// //     padding: 14,
// //     borderWidth: 1,
// //     borderColor: "#ECECEC",
// //     borderRadius: 10,
// //     marginHorizontal: 16,
// //     marginBottom: 16,
// //   },
// //   projectName: {
// //     color: "#0277D3",
// //     fontSize: 14,
// //     fontWeight: "500",
// //     marginBottom: 4,
// //   },
// //   projectSite: {
// //     color: "#333333",
// //     fontSize: 12,
// //     fontWeight: "500",
// //     marginBottom: 4,
// //   },
// //   projectDescription: {
// //     color: "#333333",
// //     fontSize: 12,
// //     fontWeight: "400",
// //   },
// //   attendanceHeader: {
// //     flexDirection: "row",
// //     borderWidth: 1,
// //     borderColor: "#ECECEC",
// //     borderRadius: 8,
// //     marginHorizontal: 16,
// //     marginBottom: 16,
// //   },
// //   tab: {
// //     flex: 1,
// //     paddingVertical: 12,
// //   },
// //   activeTab: {
// //     backgroundColor: "#242424",
// //     borderRadius: 8,
// //   },
// //   tabText: {
// //     fontSize: 14,
// //     fontWeight: "500",
// //     textAlign: "center",
// //     color: "#242424",
// //   },
// //   activeTabText: {
// //     color: "#FEFEFE",
// //   },
// // });

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {responsiveWidth} from 'react-native-responsive-dimensions';
// import {useNavigation, useRoute} from '@react-navigation/native';

// import WorkersList from '../components/AttendanceManagement/WorkersList';
// import TodaysAttendance from '../components/AttendanceManagement/TodaysAttendace';
// import BackIcon from '../assests/BackIcon';
// import { API_URL } from '../utils/url';
// import { useSelector } from 'react-redux';
// import SuperVisorTodaysAttendance from '../components/AttendanceManagement/SuperVisorTodaysAttendance';

// export default function AttendanceManagement() {
//   const [activeTab, setActiveTab] = useState('attendance');
//   const [loading, setLoading] = useState(true);
//   const [workers, setWorkers] = useState([]);
//   const route = useRoute();
//   const {projectId}=route.params
//   const userRole = useSelector(state => state.auth.user?.userType);
//   console.log(projectId)
//   const project =  {
//     name: 'City Center Mall Expansion',
//     site: 'Downtown Plaza',
//     description:
//       'Expanding the existing mall with a new wing and modernizing the food court area.',
//   };

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchWorkers = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         console.log('Token:', token);
//         const response = await axios.get(
//           `${API_URL}/worker?projectId=${projectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         setWorkers(response.data.workers);
//       } catch (error) {
//         console.error('Error fetching workers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorkers();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.mainHeader}>Attendance Management</Text>
//       </View>
//       <View style={styles.projectInfo}>
//         <Text style={styles.projectName}>{project.name}</Text>
//         <Text style={styles.projectSite}>Site: {project.site}</Text>
//         <Text style={styles.projectDescription}>{project.description}</Text>
//       </View>

//       <View style={styles.attendanceHeader}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
//           onPress={() => setActiveTab('attendance')}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 'attendance' && styles.activeTabText,
//             ]}>
//             Today's Attendance
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'workers' && styles.activeTab]}
//           onPress={() => setActiveTab('workers')}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 'workers' && styles.activeTabText,
//             ]}>
//             Workers List
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : activeTab === 'attendance' ? (
//         <TodaysAttendance workers={workers} projectId={projectId} />
//       ) : (
//         <WorkersList workers={workers} projectId={projectId} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFEFE',
//     paddingTop: 34,
//     marginHorizontal: responsiveWidth(2),
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 30,
//     marginRight: responsiveWidth(5),
//     marginBottom: 20,
//   },
//   mainHeader: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#333333',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   projectInfo: {
//     padding: 14,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 10,
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   projectName: {
//     color: '#0277D3',
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   projectSite: {
//     color: '#333333',
//     fontSize: 12,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   projectDescription: {
//     color: '#333333',
//     fontSize: 12,
//     fontWeight: '400',
//   },
//   attendanceHeader: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 8,
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 12,
//   },
//   activeTab: {
//     backgroundColor: '#242424',
//     borderRadius: 8,
//   },
//   tabText: {
//     fontSize: 14,
//     fontWeight: '500',
//     textAlign: 'center',
//     color: '#242424',
//   },
//   activeTabText: {
//     color: '#FEFEFE',
//   },
// });
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import WorkersList from '../components/AttendanceManagement/218888';
import TodaysAttendance from '../components/AttendanceManagement/TodaysAttendace';
import SuperVisorTodaysAttendance from '../components/AttendanceManagement/SuperVisorTodaysAttendance';
import BackIcon from '../assests/BackIcon';
import {API_URL} from '../utils/url';

export default function AttendanceManagement() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const route = useRoute();
  const {project} = route.params;
  const userRole = useSelector(state => state.auth.user?.userType);
  const navigation = useNavigation();

  console.log('asdasdasd', project);

  const fetchWorkers = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/worker?projectId=${project._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setWorkers(response.data.workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  }, [project._id]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const refreshWorkers = useCallback(() => {
    fetchWorkers();
  }, [fetchWorkers]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Attendance Management</Text>
      </View>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
      </View>

      <View style={styles.attendanceHeader}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
          onPress={() => setActiveTab('attendance')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'attendance' && styles.activeTabText,
            ]}>
            Today's Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'workers' && styles.activeTab]}
          onPress={() => setActiveTab('workers')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'workers' && styles.activeTabText,
            ]}>
            Workers List
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : activeTab === 'attendance' ? (
        userRole === 'Supervisor' ||
        userRole === 'Admin' ||
        userRole === 'admin' ? (
          <SuperVisorTodaysAttendance
            workers={workers}
            projectId={project._id}
          />
        ) : (
          <TodaysAttendance workers={workers} projectId={project._id} />
        )
      ) : (
        <WorkersList
          workers={workers}
          projectId={project._id}
          onRefresh={refreshWorkers}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 34,
    marginHorizontal: responsiveWidth(2),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginRight: responsiveWidth(5),
    marginBottom: 20,
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  projectInfo: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  projectName: {
    color: '#0277D3',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  projectSite: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  projectDescription: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
  },
  attendanceHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#242424',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    textAlign: 'center',
    color: '#242424',
  },
  activeTabText: {
    color: '#FEFEFE',
    fontFamily: 'Prompt-Medium',
  },
});
