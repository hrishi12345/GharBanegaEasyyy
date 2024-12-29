// import React, { useState, useEffect, useCallback } from 'react';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import CalenderIcon from '../../assests/CalenderIcon';
// import { API_URL } from '../../utils/url';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const getCurrentDate = () => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };
// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function SuperVisorTodaysAttendance({ projectId }) {
//   const [workers, setWorkers] = useState([]);

//   const [currentDate, setCurrentDate] = useState(getCurrentDate());
//   const navigation = useNavigation();
//   const [endDayForAll, setEndDayForAll] = useState(false);
//   const userRole = useSelector(state => state.auth.user?.userType);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   useEffect(() => {
//     fetchWorkers(currentDate);
//   }, [currentDate]);

//   useFocusEffect(
//     React.useCallback(() => {
//       const initializeComponent = async () => {
//         await fetchWorkers(currentDate);
//       };

//       initializeComponent();

//       return () => {};
//     }, [currentDate])
//   );

//   const openImagePreview = (imageUrl) => {
//     if (imageUrl) {
//       setPreviewImage(imageUrl);
//       setPreviewVisible(true);
//     } else {
//       console.log('No image URL provided for preview');
//     }
//   };

//   const closeImagePreview = () => {
//     setPreviewVisible(false);
//     setPreviewImage(null);
//   };

//   const fetchWorkers = async (date) => {
//     try {
//       console.log('Fetching workers for date:', date);
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(
//         `${API_URL}/attendance/supervisor?projectId=${projectId}&date=${date}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('Response:', response.data);
//       console.log(response.data.workers.endDayForAll);

//       const fetchedWorkers = response.data?.workers?.workers || [];
//       setEndDayForAll(response.data.workers.endDayForAll);
//       console.log('Fetched Workers:', fetchedWorkers);

//       setWorkers(fetchedWorkers);

//       return fetchedWorkers;
//     } catch (error) {
//       console.error('Error fetching workers:', error);
//       Alert.alert('Error', 'Failed to fetch workers.');
//       return [];
//     }
//   };

//   return (
//     <>
//       <View style={styles.dateContainer}>
//         <View style={styles.container5}>
//           <View style={styles.subcontainer}>
//           <CalenderIcon />

//           <Text style={styles.dateText}>{currentDate}</Text>
//           </View>

//         </View>

//       </View>
//       <ScrollView style={styles.workerList}>
//       {Array.isArray(workers) && workers.length > 0 ? (
//   workers.map((worker, index) => (
//             <View key={index} style={styles.workerItem}>
//               <Image
//                 source={(() => {
//                   try {
//                     return { uri: worker.media[0].compressedUrl };
//                   } catch (error) {
//                     return {
//                       uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
//                     };
//                   }
//                 })()}
//                 style={styles.workerImage}
//                 onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
//               />

//               <View style={styles.workerInfo}>
//                 <Text style={styles.workerName}>{worker.name}</Text>
//                 <View style={styles.workerContactContainer}>
//                   <Text style={styles.workerContact}>Contact:</Text>
//                   <Text style={styles.workerContactNumber}>{worker.mobile}</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => openImagePreview(worker.attendanceImage?.originalUrl || worker.attendanceImage?.compressedUrl)}>
//                 <Image
//                   source={{
//                     uri: worker.attendanceImage?.originalUrl ||
//                          worker.attendanceImage?.compressedUrl ||
//                          'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png'
//                   }}
//                   style={styles.workerImage}
//                   onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
//                 />
//               </TouchableOpacity>
//               <View style={styles.attendanceButtons}>
//                 {worker.status === 'none' && (
//                   <>
//                     <Text style={styles.timeoutText}>None</Text>

//                   </>
//                 )}
//                 {worker.status === 'Present' && (
//                   <>

//                       <Text style={styles.timeoutText}>Present</Text>

//                   </>
//                 )}
//                 {worker.status === 'Absent' && (
//                   <View style={styles.absentButton2}>
//                     <Text style={styles.absentText}>Absent</Text>
//                   </View>
//                 )}
//                 {worker.status === 'Timeout' && (
//                   <Text style={styles.timeoutText}>Timeout</Text>
//                 )}
//               </View>
//             </View>
//           ))
//         ) : (
//           <Text>No workers found.</Text>
//         )}
//       </ScrollView>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={previewVisible}
//         onRequestClose={closeImagePreview}
//       >
//         <TouchableOpacity
//           style={styles.previewContainer}
//           activeOpacity={1}
//           onPress={closeImagePreview}
//         >
//           <Image
//             source={{ uri: previewImage }}
//             style={styles.previewImage}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </Modal>
//     </>
//   );
// }
// const styles = StyleSheet.create({
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: responsiveWidth(4),
//     marginBottom: responsiveHeight(2),
//   },
//   dateText: {
//     color: '#333333',
//     fontSize: responsiveFontSize(2),
//     fontFamily: "Prompt-Medium",
//     paddingLeft: responsiveWidth(2),
//   },
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(1.5),
//     borderBottomWidth: 1,
//     borderBottomColor: '#ECECEC',
//     marginHorizontal: responsiveWidth(2.5),
//   },
//   workerImage: {
//     width: responsiveWidth(12),
//     height: responsiveWidth(12),
//     borderRadius: responsiveWidth(2),
//     marginRight: responsiveWidth(3),
//   },
//   workerInfo: {
//     flex: 1,

//   },
//   workerName: {
//     color: '#333333',
//     fontSize: responsiveFontSize(1.8),
//     fontFamily: "Prompt-Medium",
//   },
//   workerContactContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   workerContact: {
//     color: '#9F9F9F',
//     fontSize: responsiveFontSize(1.4),
//     fontFamily: "Prompt-Medium",
//     paddingRight: responsiveWidth(1),
//   },
//   workerContactNumber: {
//     color: '#0277D3',
//     fontSize: responsiveFontSize(1.4),
//     fontFamily: "Prompt-Medium",
//     textDecorationLine: 'underline',
//   },
//   attendanceButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',

//   },
//   presentButton: {
//     paddingHorizontal: responsiveWidth(3),
//     paddingVertical: responsiveHeight(1),
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: responsiveWidth(1),
//     marginRight: responsiveWidth(2),
//   },
//   presentText: {
//     color: '#00A507',
//     fontSize: responsiveFontSize(1.6),
//     fontFamily: "Prompt-Medium",
//   },
//   absentButton: {
//     paddingHorizontal: responsiveWidth(3),
//     paddingVertical: responsiveHeight(1),
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: responsiveWidth(1),
//   },
//   absentText: {
//     color: '#D00000',
//     fontSize: responsiveFontSize(1.6),
//     fontFamily: "Prompt-Medium",
//   },
//   timeoutButton: {
//     paddingHorizontal: responsiveWidth(2),
//     paddingVertical: responsiveHeight(1),
//     borderRadius: responsiveWidth(1),
//     marginRight: responsiveWidth(2),
//   },
//   timeoutText: {
//     color: '#000000',
//     fontSize: responsiveFontSize(1.6),
//     fontFamily: "Prompt-Medium",
//   },
//   presentInput: {
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: responsiveWidth(1),
//     padding: responsiveWidth(1.5),
//     width: '50%',
//     backgroundColor: '#FFFFFF',
//     color: '#000000',
//     fontSize: responsiveFontSize(1.6),
//     height:responsiveHeight(4)
//   },
//   absentButton2: {
//     paddingHorizontal: responsiveWidth(3),
//     paddingVertical: responsiveHeight(1),
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: responsiveWidth(1),
//     backgroundColor: 'grey',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   endDayButton: {
//     backgroundColor: '#0277D3',
//     padding: responsiveWidth(2.5),
//     borderRadius: responsiveWidth(1),
//     margin: responsiveWidth(2.5),
//     alignItems: 'center',
//     width: responsiveWidth(40),
//     marginLeft: responsiveWidth(10),
//   },
//   endDayButtonText: {
//     color: '#fff',
//     fontSize: responsiveFontSize(1.8),
//     fontFamily: "Prompt-Medium",
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
//   disabledButtonText: {
//     color: '#666666',
//     fontFamily: "Prompt-Medium",
//   },
//   container5: {
//     flexDirection: 'row',
//     gap: responsiveWidth(2.5),
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//   },
//   subcontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   timeout: {
//     color: 'black',
//     fontSize: responsiveFontSize(1.6),
//     fontFamily: "Prompt-Regular",
//   },
//   previewContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: screenWidth,
//     height: screenHeight,
//   },
// });

import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CalenderIcon from '../../assests/CalenderIcon';
import {API_URL} from '../../utils/url';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function SuperVisorTodaysAttendance({projectId}) {
  const [workers, setWorkers] = useState([]);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [endDayForAll, setEndDayForAll] = useState(false);
  const userRole = useSelector(state => state.auth.user?.userType);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    fetchWorkers(currentDate);
  }, [currentDate]);

  useFocusEffect(
    useCallback(() => {
      const initializeComponent = async () => {
        setCurrentDate(getCurrentDate()); // Reset date to current on page load
        await fetchWorkers(currentDate);
      };
      initializeComponent();

      return () => setCurrentDate(getCurrentDate()); // Reset date when leaving
    }, []),
  );

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = date => {
    const selectedDate = date.toISOString().split('T')[0];
    setCurrentDate(selectedDate);
    fetchWorkers(selectedDate);
    setDatePickerVisible(false);
  };

  const openImagePreview = imageUrl => {
    if (imageUrl) {
      setPreviewImage(imageUrl);
      setPreviewVisible(true);
    } else {
      console.log('No image URL provided for preview');
    }
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setPreviewImage(null);
  };

  const fetchWorkers = async date => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/attendance/supervisor?projectId=${projectId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const fetchedWorkers = response.data?.workers?.workers || [];
      setEndDayForAll(response.data.workers.endDayForAll);
      setWorkers(fetchedWorkers);

      return fetchedWorkers;
    } catch (error) {
      console.error('Error fetching workers:', error);
      Alert.alert('Error', 'Failed to fetch workers.');
      return [];
    }
  };

  return (
    <>
      <View style={styles.dateContainer}>
        <View style={styles.container5}>
          <TouchableOpacity
            style={styles.subcontainer}
            onPress={openDatePicker}>
            <CalenderIcon />
            <Text style={styles.dateText}>{currentDate}</Text>
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
              <TouchableOpacity
                onPress={() =>
                  openImagePreview(
                    worker.attendanceImage?.originalUrl ||
                      worker.attendanceImage?.compressedUrl,
                  )
                }>
                <Image
                  source={{
                    uri:
                      worker.attendanceImage?.originalUrl ||
                      worker.attendanceImage?.compressedUrl ||
                      'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
                  }}
                  style={styles.workerImage}
                  onError={e =>
                    console.log('Image loading error:', e.nativeEvent.error)
                  }
                />
              </TouchableOpacity>
              <View style={styles.attendanceButtons}>
                {worker.status === 'none' && (
                  <>
                    <Text style={styles.timeoutText}>None</Text>
                  </>
                )}
                {worker.status === 'Present' && (
                  <>
                    <Text style={styles.timeoutText}>Present</Text>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={previewVisible}
        onRequestClose={closeImagePreview}>
        <TouchableOpacity
          style={styles.previewContainer}
          activeOpacity={1}
          onPress={closeImagePreview}>
          <Image
            source={{uri: previewImage}}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={new Date(currentDate)}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisible(false)}
      />
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
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Prompt-Medium',
    paddingRight: responsiveWidth(1),
  },
  workerContactNumber: {
    color: '#0277D3',
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  attendanceButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    backgroundColor: 'grey',
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
  timeout: {
    color: 'black',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Prompt-Regular',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: screenWidth,
    height: screenHeight,
  },
});
