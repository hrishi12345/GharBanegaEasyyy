// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { Rating } from 'react-native-ratings';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const EndDayForAllScreen = ({ route, navigation }) => {
//   const { workers } = route.params;
//   const [workersData, setWorkersData] = useState(
//     workers.map(worker => ({
//       ...worker,
//       rating: 0,
//       submitted: false,
//     }))
//   );

//   const handleRating = (rating, index) => {
//     const updatedWorkers = [...workersData];
//     updatedWorkers[index].rating = rating;
//     setWorkersData(updatedWorkers);
//   };

//   const handleWorkerSubmit = index => {
//     const updatedWorkers = [...workersData];
//     updatedWorkers[index].submitted = true;
//     setWorkersData(updatedWorkers);
//   };

//   const handleMainSubmit = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'Authentication token not found. Please log in again.');
//         return;
//       }

//       const dataToSubmit = workersData.map(worker => ({
//         workerId: worker.id,
//         rating: worker.rating,
//       }));

//       const response = await axios.post(
//         'http://your-api-endpoint.com/submit-ratings',
//         { ratings: dataToSubmit },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Ratings submitted successfully!');
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error('Error submitting ratings:', error);
//       Alert.alert('Error', 'Failed to submit ratings. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>←</Text>
//       </TouchableOpacity>
//       <Text style={styles.title}>End-day For All</Text>
//       <ScrollView style={styles.workerList}>
//         {workersData.map((worker, index) => (
//           <View key={index} style={styles.workerItem}>
//             <Image
//               source={{ uri: worker.image[0]?.compressedUrl || 'https://example.com/placeholder.png' }}
//               style={styles.workerImage}
//             />
//             <View style={styles.workerInfo}>
//               <Text style={styles.workerName}>{worker.name}</Text>
//               <Rating
//                 type="star"
//                 ratingCount={5}
//                 imageSize={20}
//                 onFinishRating={rating => handleRating(rating, index)}
//                 style={styles.rating}
//               />
//             </View>
//             <TouchableOpacity
//               style={[styles.submitButton, worker.submitted && styles.submittedButton]}
//               onPress={() => handleWorkerSubmit(index)}
//               disabled={worker.submitted}
//             >
//               <Text style={styles.submitButtonText}>
//                 {worker.submitted ? 'Submitted' : 'Submit'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.mainSubmitButton} onPress={handleMainSubmit}>
//         <Text style={styles.mainSubmitButtonText}>Submit</Text>
//       </TouchableOpacity>
//       <ConfirmListModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         workers={workersData}
//         time={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         onConfirm={handleConfirm}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     padding: 10,
//   },
//   backButtonText: {
//     fontSize: 24,
//     color: '#0277D3',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 15,
//     color: '#333',
//   },
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ECECEC',
//   },
//   workerImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   workerInfo: {
//     flex: 1,
//   },
//   workerName: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//     color: '#333',
//   },
//   rating: {
//     alignItems: 'flex-start',
//   },
//   submitButton: {
//     backgroundColor: '#0277D3',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   submittedButton: {
//     backgroundColor: '#ccc',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   mainSubmitButton: {
//     backgroundColor: '#0277D3',
//     margin: 15,
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   mainSubmitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default EndDayForAllScreen;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { Rating } from 'react-native-ratings';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import ConfirmListModal from './ConfirmListScreen';
// import { API_URL } from '../../utils/url';

// const EndDayForAllScreen = ({ route, navigation }) => {
//   const { workers: initialWorkers, projectId2 } = route.params;
//   const [workers, setWorkers] = useState(initialWorkers);
//   const [filteredWorkers, setFilteredWorkers] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const filtered = workers.filter(worker => ['Present', 'Timeout'].includes(worker.status));
//     setFilteredWorkers(filtered);
//   }, [workers]);

//   const handleRating = (rating, workerId) => {
//     setWorkers(prevWorkers =>
//       prevWorkers.map(worker =>
//         worker.workerId === workerId ? { ...worker, rating } : worker
//       )
//     );
//   };

//   const validateRatings = () => {
//     return workers.every(worker =>
//       !['Present', 'Timeout'].includes(worker.status) || worker.rating > 0
//     );
//   };

//   const handleMainSubmit = async () => {
//     if (validateRatings()) {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//           Alert.alert('Error', 'Authentication token not found. Please log in again.');
//           return;
//         }

//         const projectId = `${projectId2}`;
//         const currentDate = new Date().toISOString().split('T')[0];

//         const payload = {
//           projectId,
//           date: currentDate,
//           workersInfo: workers.map(worker => ({
//             workerId: worker.workerId,
//             rating: worker.rating || 0,
//             // status: worker.status === 'none' ? 'Absent' : worker.status
//             status:worker.status
//           })),
//         };
//         console.log('payload', payload);

//         const response = await axios.post(
//           `${API_URL}/attendance/mark-endday`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log('end', response);

//         if (response.status === 200) {
//           setModalVisible(true);
//         } else {
//           Alert.alert('Error', `Failed to submit end day data. Status code: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('Error submitting end day data:', error);
//         Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
//       }
//     } else {
//       Alert.alert('Incomplete Ratings', 'Please ensure all present and timeout workers are rated before submitting.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>End-day For All</Text>
//       <ScrollView style={styles.workerList}>
//         {filteredWorkers.map((worker, index) => (
//           <View key={worker.workerId} style={styles.workerItem}>
//             <Image
//               source={{ uri: worker.media[0]?.compressedUrl || 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png' }}
//               style={styles.workerImage}
//             />
//             <View style={styles.workerInfo}>
//               <Text style={styles.workerName}>{worker.name}</Text>
//               <Text style={styles.workerStatus}>Status: {worker.status}</Text>
//               <Rating
//                 type="star"
//                 ratingCount={5}
//                 imageSize={20}
//                 onFinishRating={(rating) => handleRating(rating, worker.workerId)}
//                 style={styles.rating}
//                 startingValue={worker.rating || 0}
//               />
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.mainSubmitButton} onPress={handleMainSubmit}>
//         <Text style={styles.mainSubmitButtonText}>Submit All Ratings</Text>
//       </TouchableOpacity>

//       <ConfirmListModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         workers={workers}
//         time={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         onConfirm={() => {
//           setModalVisible(false);
//           navigation.goBack();
//         }}
//       />
//     </View>
//   );
// };
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ConfirmListModal from './ConfirmListScreen';
import {API_URL} from '../../utils/url';

const EndDayForAllScreen = ({route, navigation}) => {
  const {workers: initialWorkers, projectId2} = route.params;
  const [workers, setWorkers] = useState(initialWorkers);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(projectId2, workers);
  useEffect(() => {
    const filtered = workers.filter(worker =>
      ['Present', 'Timeout'].includes(worker.status),
    );
    setFilteredWorkers(filtered);
  }, [workers]);

  const handleRating = (rating, workerId) => {
    setWorkers(prevWorkers =>
      prevWorkers.map(worker =>
        worker.workerId === workerId ? {...worker, rating} : worker,
      ),
    );
  };

  const validateRatings = () => {
    return workers.every(
      worker =>
        !(['Present', 'Timeout'].includes(worker.status) && worker.rating <= 0),
    );
  };

  const handleMainSubmit = async () => {
    if (validateRatings()) {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert(
            'Error',
            'Authentication token not found. Please log in again.',
          );
          return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const filteredWorkersInfo = workers
          .filter(
            worker =>
              ['Present', 'Timeout'].includes(worker.status) &&
              worker.rating > 0,
          )
          .map(worker => ({
            workerId: worker.workerId,
            rating: worker.rating,
          }));

        const payload = {
          projectId: projectId2,
          date: currentDate,
          workersInfo: filteredWorkersInfo,
        };
        console.log(payload);
        const response = await axios.post(
          `${API_URL}/attendance/rating`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setModalVisible(true);
        } else {
          Alert.alert(
            'Error',
            `Failed to submit ratings. Status code: ${response.status}`,
          );
        }
      } catch (error) {
        console.error('Error submitting ratings:', error);
        Alert.alert(
          'Error',
          'An unexpected error occurred. Please try again later.',
        );
      }
    } else {
      Alert.alert(
        'Incomplete Ratings',
        'Please ensure all present and timeout workers are rated before submitting.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>End-day For All</Text>
      <ScrollView style={styles.workerList}>
        {filteredWorkers.map((worker, index) => (
          <View key={worker.workerId} style={styles.workerItem}>
            <Image
              source={{
                uri:
                  worker.media[0]?.compressedUrl ||
                  'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
              }}
              style={styles.workerImage}
            />
            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{worker.name}</Text>
              <Text style={styles.workerStatus}>Status: {worker.status}</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                onFinishRating={rating => handleRating(rating, worker.workerId)}
                style={styles.rating}
                startingValue={worker.rating || 0}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.mainSubmitButton}
        onPress={handleMainSubmit}>
        <Text style={styles.mainSubmitButtonText}>Submit All Ratings</Text>
      </TouchableOpacity>

      <ConfirmListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        workers={workers}
        projectId2={projectId2}
        time={new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
        onConfirm={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  workerList: {
    flex: 1,
  },
  workerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  workerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  workerStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    alignItems: 'flex-start',
  },
  mainSubmitButton: {
    backgroundColor: '#0277D3',
    margin: 15,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  mainSubmitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EndDayForAllScreen;
