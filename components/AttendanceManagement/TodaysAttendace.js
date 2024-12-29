// import React from "react";
// import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
// import CalenderIcon from "../../assests/CalenderIcon";

// export default function TodaysAttendance() {
//   const workers = [
//     { name: "John Smith", contact: "9944665588", image: "https://picsum.photos/id/1/100" },
//     { name: "Emma Johnson", contact: "9955776633", image: "https://picsum.photos/id/2/100" },
//     { name: "Michael Brown", contact: "9966887744", image: "https://picsum.photos/id/3/100" },
//     { name: "Sarah Davis", contact: "9977998855", image: "https://picsum.photos/id/4/100" },
//     { name: "David Wilson", contact: "9988009966", image: "https://picsum.photos/id/5/100" },
//   ];

//   return (
//     <>
//       <View style={styles.dateContainer}>
//         <CalenderIcon />
//         <Text style={styles.dateText}>16/08/2024</Text>
//       </View>
//       <ScrollView style={styles.workerList}>
//         {workers.map((worker, index) => (
//           <View key={index} style={styles.workerItem}>
//             <Image source={{ uri: worker.image }} style={styles.workerImage} />
//             <View style={styles.workerInfo}>
//               <Text style={styles.workerName}>{worker.name}</Text>
//               <View style={styles.workerContactContainer}>
//                 <Text style={styles.workerContact}>Contact:</Text>
//                 <Text style={styles.workerContactNumber}>{worker.contact}</Text>
//               </View>
//             </View>
//             <View style={styles.attendanceButtons}>
//               <TouchableOpacity style={styles.presentButton}>
//                 <Text style={styles.presentText}>Present</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.absentButton}>
//                 <Text style={styles.absentText}>Absent</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   dateContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   dateText: {
//     color: "#333333",
//     fontSize: 16,
//     fontWeight: "500",
//     paddingLeft: 10,
//   },
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ECECEC",
//   },
//   workerImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   workerInfo: {
//     flex: 1,
//   },
//   workerName: {
//     color: "#333333",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   workerContactContainer: {
//     flexDirection: "row",
//   },
//   workerContact: {
//     color: "#9F9F9F",
//     fontSize: 11,
//     fontWeight: "400",
//     paddingRight: 2,
//   },
//   workerContactNumber: {
//     color: "#0277D3",
//     fontSize: 11,
//     fontWeight: "400",
//     textDecorationLine: "underline",
//   },
//   attendanceButtons: {
//     flexDirection: "row",
//     width: "40%",
//     marginHorizontal: 15,
//   },
//   presentButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "#ECECEC",
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   presentText: {
//     color: "#00A507",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   absentButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "#ECECEC",
//     borderRadius: 4,
//   },
//   absentText: {
//     color: "#D00000",
//     fontSize: 14,
//     fontWeight: "400",
//   },
// });

// import React from "react";
// import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
// import CalenderIcon from "../../assests/CalenderIcon";

// export default function TodaysAttendance({ workers }) {
//   return (
//     <>
//       <View style={styles.dateContainer}>
//         <CalenderIcon />
//         <Text style={styles.dateText}>16/08/2024</Text>
//       </View>
//       <ScrollView style={styles.workerList}>
//         {workers.map((worker, index) => (
//           <View key={index} style={styles.workerItem}>
//             <Image source={{ uri: worker.image }} style={styles.workerImage} />
//             <View style={styles.workerInfo}>
//               <Text style={styles.workerName}>{worker.name}</Text>
//               <View style={styles.workerContactContainer}>
//                 <Text style={styles.workerContact}>Contact:</Text>
//                 <Text style={styles.workerContactNumber}>{worker.mobile}</Text>
//               </View>
//             </View>
//             <View style={styles.attendanceButtons}>
//               <TouchableOpacity style={styles.presentButton}>
//                 <Text style={styles.presentText}>Present</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.absentButton}>
//                 <Text style={styles.absentText}>Absent</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   dateContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   dateText: {
//     color: "#333333",
//     fontSize: 16,
//     fontWeight: "500",
//     paddingLeft: 10,
//   },
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ECECEC",
//   },
//   workerImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   workerInfo: {
//     flex: 1,
//   },
//   workerName: {
//     color: "#333333",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   workerContactContainer: {
//     flexDirection: "row",
//   },
//   workerContact: {
//     color: "#9F9F9F",
//     fontSize: 11,
//     fontWeight: "400",
//     paddingRight: 2,
//   },
//   workerContactNumber: {
//     color: "#0277D3",
//     fontSize: 11,
//     fontWeight: "400",
//     textDecorationLine: "underline",
//   },
//   attendanceButtons: {
//     flexDirection: "row",
//     width: "40%",
//     marginHorizontal: 15,
//   },
//   presentButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "#ECECEC",
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   presentText: {
//     color: "#00A507",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   absentButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "#ECECEC",
//     borderRadius: 4,
//   },
//   absentText: {
//     color: "#D00000",
//     fontSize: 14,
//     fontWeight: "400",
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Modal,
// } from 'react-native';
// import CalenderIcon from '../../assests/CalenderIcon';
// import * as ImagePicker from 'react-native-image-picker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TimePicker from './TimePicker';

// export default function TodaysAttendance() {
//   const [workers, setWorkers] = useState([]);
//   const [currentWorkerId, setCurrentWorkerId] = useState(null);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [selectedTime, setSelectedTime] = useState({ hours: 6, minutes: 28, seconds: 55, period: 'PM' });
//   const [currentWorker, setCurrentWorker] = useState(null);

//   useEffect(() => {
//     fetchWorkers();
//   }, []);

//   const fetchWorkers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(
//         'http://3.110.171.43:5000/api/attendance?projectId=668c372e432809f7668d4c0e&date=2024-09-10',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       console.log(response.data.workers);
//       setWorkers(response.data.workers);
//     } catch (error) {
//       console.error('Error fetching workers:', error);
//       Alert.alert('Error', 'Failed to fetch workers.');
//     }
//   };

//   const handlePresent = workerId => {
//     openCamera(workerId);
//   };

//   const openCamera = workerId => {
//     const options = {
//       mediaType: 'photo',
//       cameraType: 'back',
//       quality: 1,
//     };

//     ImagePicker.launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled camera');
//       } else if (response.error) {
//         console.error('Camera Error: ', response.error);
//       } else {
//         handlePictureTaken(response.assets[0], workerId);
//       }
//     });
//   };

//   const handlePictureTaken = async (photo, workerId) => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log('worker',workerId)
//       if (!token) {
//         console.error('Token not found');
//         Alert.alert(
//           'Error',
//           'Authentication token not found. Please log in again.',
//         );
//         return;
//       }

//       const formData = new FormData();
//       formData.append('workerId', workerId);
//       formData.append('projectId', '668c372e432809f7668d4c0e');
//       formData.append('date', '2024-09-10');
//       formData.append('contactorId', '6697c59fff40c409cc29293d');
//       formData.append('files', {
//         uri: photo.uri,
//         type: 'image/jpeg',
//         name: 'attendance.jpg',
//       });
//       formData.append('checkInTime', new Date().toISOString());
//       console.log('formData', formData);
//       await axios.post('http://3.110.171.43:5000/api/attendance', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       fetchWorkers(); // Refresh worker list
//       Alert.alert('Success', 'Attendance marked successfully!');
//     } catch (error) {
//       console.error('Error marking attendance:', error);
//       Alert.alert('Error', 'Failed to mark attendance.');
//     }
//   };

//   const handleAbsent = async workerId => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log(workerId);
//       await axios.post(
//         'http://3.110.171.43:5000/api/attendance/absent',
//         {
//           projectId: '668c372e432809f7668d4c0e',
//           date: '2024-09-10',
//           workerId: workerId,
//           contractorId: '6697c59fff40c409cc29293d',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       fetchWorkers(); // Refresh worker list
//       Alert.alert('Success', 'Worker marked as absent.');
//     } catch (error) {
//       console.error('Error marking absent:', error);
//       Alert.alert('Error', 'Failed to mark worker as absent.');
//     }
//   };

//   const handleTimeoutPress = (worker) => {
//     setCurrentWorker(worker);
//     setShowTimePicker(true);
//   };

//   const handleTimeSelect = async (time) => {
//     setShowTimePicker(false);
//     setSelectedTime(time);

//     try {
//       const token = await AsyncStorage.getItem('token');
//       const formattedTime = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')} ${time.period}`;
//       console.log('currentworker',currentWorker)
//       const response = await axios.patch(
//         `http://192.168.1.2:5000/api/attendance/timeout?projectId=668c372e432809f7668d4c0e&workerId=${currentWorker.workerId}&date=2024-09-10`,
//         { checkOutTime: formattedTime },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Timeout recorded successfully');
//         fetchWorkers(); // Refresh the worker list
//       }
//     } catch (error) {
//       console.error('Error recording timeout:', error);
//       Alert.alert('Error', 'Failed to record timeout');
//     }
//   };

//   return (
//     <>
//       <View style={styles.dateContainer}>
//         <CalenderIcon />
//         <Text style={styles.dateText}>10/09/2024</Text>
//       </View>
//       <ScrollView style={styles.workerList}>
//         {workers.map((worker, index) => (
//           <View key={index} style={styles.workerItem}>
//             <Image
//               source={(() => {
//                 try {
//                   return {uri: worker.media[0].compressedUrl};
//                 } catch (error) {
//                   return {
//                     uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
//                   };
//                 }
//               })()}
//               style={styles.workerImage}
//               onError={e => {
//                 console.log('Image loading error:', e.nativeEvent.error);
//               }}
//             />

//             <View style={styles.workerInfo}>
//               <Text style={styles.workerName}>{worker.name}</Text>
//               <View style={styles.workerContactContainer}>
//                 <Text style={styles.workerContact}>Contact:</Text>
//                 <Text style={styles.workerContactNumber}>{worker.mobile}</Text>
//               </View>
//             </View>
//             <View style={styles.attendanceButtons}>
//               {worker.status === 'none' && (
//                 <>
//                   <TouchableOpacity
//                     style={styles.presentButton}
//                     onPress={() => handlePresent(worker.workerId)}>
//                     <Text style={styles.presentText}>Present</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.absentButton}
//                     onPress={() => handleAbsent(worker.workerId)}>
//                     <Text style={styles.absentText}>Absent</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
//               {worker.status === 'Present' && (
//                 <>
//                   <TouchableOpacity
//                     style={styles.timeoutButton}
//                     onPress={() => handleTimeoutPress(worker)}
//                   >
//                     <Text style={styles.timeoutText}>Timeout</Text>
//                   </TouchableOpacity>
//                   <TextInput
//                     style={styles.presentInput}
//                     placeholder="Enter hours worked"
//                     editable={false}
//                     onPressIn={() => handleTimeoutPress(worker)}
//                   />
//                 </>
//               )}
//               {worker.status === 'Absent' && (
//                 <View style={styles.absentButton2}>
//                   <Text style={styles.absentText}>Absent</Text>
//                 </View>
//               )}
//               {worker.status === 'Timeout' && (
//                 <Text style={styles.timeoutText}>Timeout</Text>
//               )}
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <Modal
//         visible={showTimePicker}
//         transparent={true}
//         animationType="fade"
//       >
//         <View style={styles.modalOverlay}>
//           <TimePicker
//             initialTime={selectedTime}
//             onSave={handleTimeSelect}
//             onCancel={() => setShowTimePicker(false)}
//           />
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   dateText: {
//     color: '#333333',
//     fontSize: 16,
//     fontWeight: '500',
//     paddingLeft: 10,
//   },
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ECECEC',
//   },
//   workerImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   workerInfo: {
//     flex: 1,
//   },
//   workerName: {
//     color: '#333333',
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   workerContactContainer: {
//     flexDirection: 'row',
//   },
//   workerContact: {
//     color: '#9F9F9F',
//     fontSize: 11,
//     fontWeight: '400',
//     paddingRight: 2,
//   },
//   workerContactNumber: {
//     color: '#0277D3',
//     fontSize: 11,
//     fontWeight: '400',
//     textDecorationLine: 'underline',
//   },
//   attendanceButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     width: '50%',
//   },
//   presentButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   presentText: {
//     color: '#00A507',
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   absentButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 4,
//   },
//   absentText: {
//     color: '#D00000',
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   timeoutButton: {
//     paddingHorizontal: 9,
//     paddingVertical: 6,

//     borderRadius: 4,
//     marginRight: 8,
//   },
//   timeoutText: {
//     color: '#000000',
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   presentInput: {
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 4,
//     padding: 6,
//     width: '50%',
//     backgroundColor: '#FFFFFF',
//     color: '#000000',
//   },

//   absentButton2: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 4,
//     backgroundColor: 'grey',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimePicker from './TimePicker';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../utils/url';
import {useFocusEffect} from '@react-navigation/native';
import CalenderIcon from '../../assests/CalenderIcon';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';

const {width: screenWidth} = Dimensions.get('window');
const isToday = (dateString) => {
  const today = new Date();
  const compareDate = new Date(dateString);
  
  return (
    today.getFullYear() === compareDate.getFullYear() &&
    today.getMonth() === compareDate.getMonth() &&
    today.getDate() === compareDate.getDate()
  );
};
export default function TodaysAttendance({projectId}) {
  const [workers, setWorkers] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hours: 6,
    minutes: 28,
    seconds: 55,
    period: 'PM',
  });
  const [currentWorker, setCurrentWorker] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();
  const [endDayForAll, setEndDayForAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const initializeComponent = async () => {
        const date = getCurrentDate();
        setCurrentDate(date);
        const fetchedWorkers = await fetchWorkers(date);
        console.log('Refreshed Workers:', fetchedWorkers);
      };

      initializeComponent();
    }, []),
  );

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  const fetchWorkers = async date => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/attendance?projectId=${projectId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Response:', response.data);
      console.log(response.data.workers.endDayForAll);

      // Safely access workers property
      const fetchedWorkers = response.data?.workers?.workers || [];
      setEndDayForAll(response.data.workers.endDayForAll);
      console.log('Fetched Workers:', fetchedWorkers);

      setWorkers(fetchedWorkers);

      return fetchedWorkers;
    } catch (error) {
      console.error('Error fetching workers:', error);
      Alert.alert('Error', 'Failed to fetch workers.');
      return [];
    }
  };
  const openDatePicker = () => {
    setDatePickerVisible(true);
  };
  const handleDateChange = date => {
    const selectedDate = date.toISOString().split('T')[0];
    setCurrentDate(selectedDate);
    fetchWorkers(selectedDate);
    setDatePickerVisible(false);
  };
  const handlePresent = async workerId => {
    setCurrentWorker(workerId);
    openCamera(workerId);
  };

  const openCamera = async workerId => {
    setIsLoading(true);
    try {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 1,
      };
      ImagePicker.launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
          setIsLoading(false);
        } else if (response.error) {
          console.error('Camera Error: ', response.error);
          Alert.alert('Error', 'Failed to capture image.');
          setIsLoading(false);
        } else {
          await handlePictureTaken(response.assets[0], workerId);
        }
      });
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', 'Failed to open camera.');
      setIsLoading(false);
    }
  };

  const handlePictureTaken = async (photo, workerId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        Alert.alert(
          'Error',
          'Authentication token not found. Please log in again.',
        );
        return;
      }

      const formData = new FormData();
      formData.append('workerId', workerId);
      formData.append('projectId', `${projectId}`);
      formData.append('date', currentDate);
      formData.append('contactorId', '6697c59fff40c409cc29293d');
      formData.append('files', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'attendance.jpg',
      });
      formData.append('checkInTime', new Date().toISOString());

      await axios.post(`${API_URL}/attendance`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWorkers(currentDate);
      Alert.alert('Success', 'Attendance marked successfully!');
    } catch (error) {
      console.error('Error marking attendance:', error);
      Alert.alert('Error', 'Failed to mark attendance.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAbsent = async workerId => {
    Alert.alert(
      'Mark Absent',
      'Are you sure you want to mark this worker as absent?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setIsLoading(true);
            try {
              const token = await AsyncStorage.getItem('token');
              console.log(currentDate, workerId);
              await axios.post(
                `${API_URL}/attendance/absent`,
                {
                  projectId: `${projectId}`,
                  date: currentDate,
                  workerId: workerId,
                  contractorId: '6697c59fff40c409cc29293d',
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                },
              );
              fetchWorkers(currentDate);
              Alert.alert('Success', 'Worker marked as absent.');
            } catch (error) {
              console.error('Error marking absent:', error);
              Alert.alert('Error', 'Failed to mark worker as absent.');
            } finally {
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const handleTimeoutPress = worker => {
    setCurrentWorker(worker);
    setShowTimePicker(true);
  };

  const handleTimeSelect = async time => {
    setShowTimePicker(false);
    setSelectedTime(time);
    try {
      const token = await AsyncStorage.getItem('token');
      const formattedTime = `${time.hours
        .toString()
        .padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')} ${
        time.period
      }`;
      const response = await axios.patch(
        `${API_URL}/attendance/timeout?projectId=${projectId}&workerId=${currentWorker.workerId}&date=${currentDate}`,
        {checkOutTime: formattedTime},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Timeout recorded successfully');
        fetchWorkers(currentDate);
      }
    } catch (error) {
      console.error('Error recording timeout:', error);
      Alert.alert('Error', 'Failed to record timeout');
    }
  };

  return (
    <>
      <View style={styles.dateContainer}>
        <View style={styles.container5}>
          <TouchableOpacity onPress={openDatePicker} style={styles.subcontainer}>
            <CalenderIcon />
            <Text style={styles.dateText}>{currentDate}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.endDayButton, endDayForAll && styles.disabledButton]}
            onPress={() =>
              navigation.navigate('EndDayForAll', {
                workers: workers,
                projectId2: projectId,
              })
            }
            disabled={endDayForAll}>
            <Text
              style={[
                styles.endDayButtonText,
                endDayForAll && styles.disabledButtonText,
              ]}>
              {endDayForAll ? 'Day Marked for All' : 'Mark day for all'}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
  style={[
    styles.endDayButton,
    (endDayForAll || !isToday(currentDate)) && styles.disabledButton
  ]}
  onPress={() =>
    navigation.navigate('EndDayForAll', {
      workers: workers,
      projectId2: projectId,
    })
  }
  disabled={endDayForAll || !isToday(currentDate)}
>
  <Text
    style={[
      styles.endDayButtonText,
      (endDayForAll || !isToday(currentDate)) && styles.disabledButtonText
    ]}
  >
    {endDayForAll ? 'Day Marked for All' : 'Mark day for all'}
  </Text>
</TouchableOpacity>
        </View>
      </View>


      <ScrollView style={styles.workerList}>
        {Array.isArray(workers) && workers.length > 0 ? (
          workers.map((worker, index) => (
            <View key={index} style={styles.workerItem}>
              <Image
                source={(() => {
                  try {
                    return {uri: worker.media[0].compressedUrl};
                  } catch (error) {
                    return {
                      uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
                    };
                  }
                })()}
                style={styles.workerImage}
                onError={e =>
                  console.log('Image loading error:', e.nativeEvent.error)
                }
              />

              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <View style={styles.workerContactContainer}>
                  <Text style={styles.workerContact}>Contact:</Text>
                  <Text style={styles.workerContactNumber}>
                    {worker.mobile}
                  </Text>
                </View>
              </View>
              <View style={styles.attendanceButtons}>
        {worker.status === 'none' && isToday(currentDate) && (
          <>
            <TouchableOpacity
              style={styles.presentButton}
              onPress={() => handlePresent(worker.workerId)}>
              <Text style={styles.presentText}>Present</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.absentButton}
              onPress={() => handleAbsent(worker.workerId)}>
              <Text style={styles.absentText}>Absent</Text>
            </TouchableOpacity>
          </>
        )}
        {worker.status === 'Present' && (
          <>
            <View style={styles.timeoutButton}>
              <Text style={styles.timeoutText}>Timeout</Text>
            </View>
            {endDayForAll || !isToday(currentDate) ? (
              <View style={[styles.presentInput, styles.disabledInput]}>
                <Text>Hours Worked</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.presentInput}
                onPress={() => handleTimeoutPress(worker)}>
                <Text placeholder="Enter hours worked" editable={false} />
              </TouchableOpacity>
            )}
          </>
        )}

                {worker.status === 'Absent' && (
                  <View style={styles.absentButton2}>
                    <Text style={styles.absentText}>Absent</Text>
                  </View>
                )}
                {worker.status === 'Timeout' && (
                  <Text style={styles.timeoutText}>Timeout</Text>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text>No workers found.</Text>
        )}
      </ScrollView>

      <Modal visible={showTimePicker} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <TimePicker
            initialTime={selectedTime}
            onSave={handleTimeSelect}
            onCancel={() => setShowTimePicker(false)}
          />
        </View>
      </Modal>
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={date}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisible(false)}
      />

      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loaderText}>Processing...</Text>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  dateText: {
    color: '#333333',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Prompt-Medium',
    paddingLeft: responsiveWidth(2),
  },
  workerList: {
    flex: 1,
  },
  workerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    marginHorizontal: responsiveWidth(2.5),
  },
  workerImage: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(3),
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    color: '#333333',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Prompt-Medium',
  },
  workerContactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerContact: {
    color: '#9F9F9F',
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Prompt-Medium',
    paddingRight: responsiveWidth(1),
  },
  workerContactNumber: {
    color: '#0277D3',
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  attendanceButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '50%',
  },
  presentButton: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: responsiveWidth(1),
    marginRight: responsiveWidth(2),
  },
  presentText: {
    color: '#00A507',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Prompt-Medium',
  },
  absentButton: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: responsiveWidth(1),
  },
  absentText: {
    color: '#D00000',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Prompt-Medium',
  },
  timeoutButton: {
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(1),
    marginRight: responsiveWidth(2),
  },
  timeoutText: {
    color: '#000000',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Prompt-Medium',
  },
  presentInput: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: responsiveWidth(1),
    padding: responsiveWidth(1.5),
    width: '50%',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: responsiveFontSize(1.6),
    height: responsiveHeight(4),
  },
  absentButton2: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: responsiveWidth(1),
    backgroundColor: '#ECECEC',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endDayButton: {
    backgroundColor: '#0277D3',
    padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1),
    margin: responsiveWidth(2.5),
    alignItems: 'center',
    width: responsiveWidth(40),
    marginLeft: responsiveWidth(10),
  },
  endDayButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Prompt-Medium',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledButtonText: {
    color: '#666666',
    fontFamily: 'Prompt-Medium',
  },
  container5: {
    flexDirection: 'row',
    gap: responsiveWidth(2.5),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
  },
  presentInput: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: responsiveWidth(1),
    padding: responsiveWidth(1.5),
    width: '50%',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: responsiveFontSize(1.6),
    height: responsiveHeight(4),
  },

  disabledInput: {
    backgroundColor: '#ECECEC',
    opacity: 0.5,
  },
});
