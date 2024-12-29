// import React from "react";
// import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
// import WorkerIcon from "../../assests/WorkerIcon";

// export default function WorkersList() {
//   const workers = [
//     { name: "John Smith", contact: "9944665588", image: "https://picsum.photos/id/1/100" },
//     { name: "Emma Johnson", contact: "9955776633", image: "https://picsum.photos/id/2/100" },
//     { name: "Michael Brown", contact: "9966887744", image: "https://picsum.photos/id/3/100" },
//     { name: "Sarah Davis", contact: "9977998855", image: "https://picsum.photos/id/4/100" },
//     { name: "David Wilson", contact: "9988009966", image: "https://picsum.photos/id/5/100" },
//   ];

//   return (
//     <>
//     <TouchableOpacity style={styles.addWorkerButton}>
//       <Text style={styles.addWorkerButtonText}>+ Add Worker</Text>
//     </TouchableOpacity>
//     <Text style={styles.workerListTitle}>Workers List</Text>

//     <ScrollView style={styles.workerList}>
//       {workers.map((worker, index) => (
//         <View key={index} style={styles.workerItem}>
//           <Image source={{ uri: worker.image }} style={styles.workerImage} />
//           <View style={styles.workerInfo}>
//             <Text style={styles.workerName}>{worker.name}</Text>
//             <View style={styles.workerContactContainer}>
//               <Text style={styles.workerContact}>Contact:</Text>
//               <Text style={styles.workerContactNumber}>{worker.contact}</Text>
//             </View>
//           </View>
//           <TouchableOpacity style={styles.addButton}>
//            <WorkerIcon />
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: "row",

//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ECECEC",
//   },
//   workerImage: {
//     width: 55,
//     height: 55,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   workerInfo: {
//     flex: 1,
//   },
//   workerName: {
//     color: "#333333",
//     fontSize: 15,
//     fontWeight: "400",
//     marginBottom:15
//   },
//   workerContactContainer: {
//     flexDirection: "row",
//   },
//   workerContact: {
//     color: "#9F9F9F",
//     fontSize: 13,
//     fontWeight: "400",
//     paddingRight: 2,
//   },
//   workerContactNumber: {
//     color: "#0277D3",
//     fontSize: 13,
//     fontWeight: "400",
//     textDecorationLine: "underline",
//   },
//   addButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,

//     borderRadius: 4,

//   },
//   addText: {
//     color: "#FEFEFE",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   addWorkerButton: {
//     backgroundColor: "#0277D3",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal:20
//   },
//   addWorkerButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   workerListTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 16,
//     marginVertical: 10,
//     color: "#333333",
//   },
// });

// import React from "react";
// import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
// import WorkerIcon from "../../assests/WorkerIcon";

// export default function WorkersList({ workers }) {
//   console.log(workers)
//   return (
//     <>
//       <TouchableOpacity style={styles.addWorkerButton}>
//         <Text style={styles.addWorkerButtonText}>+ Add Worker</Text>
//       </TouchableOpacity>
//       <Text style={styles.workerListTitle}>Workers List</Text>

//       <ScrollView style={styles.workerList}>
//         {workers.map((worker, index) => (
//           <View key={index} style={styles.workerItem}>
//            <Image
//   source={(() => {
//     try {
//       return { uri: workers[0].image[0].compressedUrl };
//     } catch (error) {
//       return { uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png' };
//     }
//   })()}
//   style={styles.workerImage}
//   onError={(e) => {
//     console.log('Image loading error:', e.nativeEvent.error);
//     // You can set a state here to use the fallback image if needed
//   }} />
//             <View style={styles.workerInfo}>
//               <Text style={styles.workerName}>{worker.name}</Text>
//               <View style={styles.workerContactContainer}>
//                 <Text style={styles.workerContact}>Contact:</Text>
//                 <Text style={styles.workerContactNumber}>{worker.mobile}</Text>
//               </View>
//             </View>
//             <TouchableOpacity style={styles.addButton}>
//               <WorkerIcon />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   workerList: {
//     flex: 1,
//   },
//   workerItem: {
//     flexDirection: "row",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ECECEC",
//   },
//   workerImage: {
//     width: 55,
//     height: 55,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   workerInfo: {
//     flex: 1,
//   },
//   workerName: {
//     color: "#333333",
//     fontSize: 15,
//     fontWeight: "400",
//     marginBottom: 15,
//   },
//   workerContactContainer: {
//     flexDirection: "row",
//   },
//   workerContact: {
//     color: "#9F9F9F",
//     fontSize: 13,
//     fontWeight: "400",
//     paddingRight: 2,
//   },
//   workerContactNumber: {
//     color: "#0277D3",
//     fontSize: 13,
//     fontWeight: "400",
//     textDecorationLine: "underline",
//   },
//   addButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 4,
//   },
//   addWorkerButton: {
//     backgroundColor: "#0277D3",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal: 20,
//   },
//   addWorkerButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   workerListTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 16,
//     marginVertical: 10,
//     color: "#333333",
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
  Modal,
  TextInput,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import WorkerIcon from '../../assests/WorkerIcon';
import CameraIcon from '../../assests/CameraIcon';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/url';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function WorkersList({workers, projectId, onRefresh}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  console.log(workers);

  const onRefreshList = useCallback(async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh]);
  const openAddWorkerModal = () => {
    setModalVisible(true);
  };

  const openImagePreview = imageUrl => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setPreviewVisible(false);
    setPreviewImage(null);
  };

  const closeAddWorkerModal = () => {
    setModalVisible(false);
    setName('');
    setMobile('');
    setProfileImage(null);
    setIdImage(null);
  };

  const openCamera = isProfileImage => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.error('Camera Error: ', response.error);
      } else {
        if (isProfileImage) {
          setProfileImage(response.assets[0]);
        } else {
          setIdImage(response.assets[0]);
        }
      }
    });
  };

  const saveWorker = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert(
          'Error',
          'Authentication token not found. Please log in again.',
        );
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('mobile', mobile);
      formData.append('projectId', projectId);

      // Directly append files to formData without JSON.stringify
      if (profileImage) {
        formData.append('files', {
          uri: profileImage.uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
      if (idImage) {
        formData.append('files', {
          uri: idImage.uri,
          type: 'image/jpeg',
          name: 'id.jpg',
        });
      }

      console.log('FormData to send:', formData);
      const response = await axios.post(`${API_URL}/worker`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      Alert.alert('Success', 'Worker added successfully!');
      closeAddWorkerModal();
      onRefreshList();
    } catch (error) {
      console.error('Error adding worker:', error);
      Alert.alert('Error', 'Failed to add worker.');
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.addWorkerButton}
        onPress={openAddWorkerModal}>
        <Text style={styles.addWorkerButtonText}>+ Add Worker</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeAddWorkerModal}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeAddWorkerModal}>
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Add Worker</Text>

            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={() => openCamera(true)}>
              <Text style={styles.profileImageText}>Profile Image</Text>
              <View style={styles.pictureContainer}>
                {profileImage ? (
                  <Image
                    source={{uri: profileImage.uri}}
                    style={styles.capturedImage}
                  />
                ) : (
                  <CameraIcon style={styles.cameraIcon} />
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#000000"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#000000"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />

            <TouchableOpacity
              style={styles.takeIDButton}
              onPress={() => openCamera(false)}>
              <Text style={styles.takeIDButtonText}>Take ID Image</Text>
            </TouchableOpacity>

            {idImage && (
              <Image source={{uri: idImage.uri}} style={styles.idImage} />
            )}

            <TouchableOpacity
              style={styles.saveWorkerButton}
              onPress={saveWorker}>
              <Text style={styles.saveWorkerButtonText}>Save Worker</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.workerListTitle}>Workers List</Text>

      <ScrollView
        style={styles.workerList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshList}
            colors={['#0277D3']} // Customize the loading indicator color
          />
        }>
        {workers.map((worker, index) => (
          <View key={index} style={styles.workerItem}>
            <TouchableOpacity
              onPress={() =>
                openImagePreview(
                  worker.image[0]?.compressedUrl ||
                    'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
                )
              }>
              <Image
                source={(() => {
                  try {
                    return {uri: worker.image[0].compressedUrl};
                  } catch (error) {
                    return {
                      uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
                    };
                  }
                })()}
                style={styles.workerImage}
                onError={e => {
                  console.log('Image loading error:', e.nativeEvent.error);
                }}
              />
            </TouchableOpacity>

            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{worker.name}</Text>
              <View style={styles.workerContactContainer}>
                <Text style={styles.workerContact}>Contact:</Text>
                <Text style={styles.workerContactNumber}>{worker.mobile}</Text>
              </View>
            </View>

            {/* WorkerIcon with ID photo preview on click */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                openImagePreview(
                  worker.idProof[0]?.compressedUrl ||
                    'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
                )
              }>
              <WorkerIcon />
            </TouchableOpacity>
          </View>
        ))}
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
    </>
  );
}

const styles = StyleSheet.create({
  workerList: {
    flex: 1,
  },
  workerItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  workerImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 12,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    color: '#333333',
    fontSize: 15,
    fontFamily: 'Prompt-Medium',
    marginBottom: 15,
  },
  workerContactContainer: {
    flexDirection: 'row',
  },
  workerContact: {
    color: '#9F9F9F',
    fontSize: 13,
    fontFamily: 'Prompt-Medium',
    paddingRight: 2,
  },
  workerContactNumber: {
    color: '#0277D3',
    fontSize: 13,
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addWorkerButton: {
    backgroundColor: '#0277D3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addWorkerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  workerListTitle: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    marginLeft: 16,
    marginVertical: 10,
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Prompt-Bold',
    marginBottom: 20,
    color: '#0277D3',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraIcon: {
    marginBottom: 10,
  },
  profileImageText: {
    color: '#888',
    fontFamily: 'Prompt-Medium',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 5,
    color: 'black',
  },
  takeIDButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  takeIDButtonText: {
    color: 'white',
    fontFamily: 'Prompt-Medium',
  },
  saveWorkerButton: {
    backgroundColor: '#0277D3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  saveWorkerButtonText: {
    color: 'white',
    fontFamily: 'Prompt-Medium',
  },
  pictureContainer: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  capturedImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  idImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
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
