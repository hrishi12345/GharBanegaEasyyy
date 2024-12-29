// import React from 'react';
// import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';

// const AddProgressModal = ({ visible, onClose }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Add Progress</Text>
//           <TextInput
//             placeholder="Stage Name"
//             style={styles.textInput}
//             // Add more props like value, onChangeText here
//           />
//           <TouchableOpacity style={styles.uploadButton}>
//             <Text style={styles.uploadButtonText}>Upload Images or Videos</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={onClose} // Close the modal on save
//           >
//             <Text style={styles.saveButtonText}>Save Worker</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   textInput: {
//     width: '100%',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     width: '100%',
//     backgroundColor: '#000000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   uploadButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   saveButton: {
//     width: '100%',
//     backgroundColor: '#0277D3',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default AddProgressModal;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   Alert,
//   Image,
//   ScrollView,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import * as ImagePicker from 'react-native-image-picker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_URL } from '../../utils/url';

// const stages = [
//   'Development',
//   'Implementation',
//   'Testing',
//   'Deployment',
//   'Maintenance',
// ];

// const AddProgressModal = ({ visible, onClose, projectId, fetchProgressData }) => {
//   const [selectedStage, setSelectedStage] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [progressStages, setProgressStages] = useState([]);
//   // Reset state when modal closes
//   useEffect(() => {
//     if (!visible) {
//       // Clear state when the modal is closed
//       setSelectedStage(null);
//       setFiles([]);
//     }
//   }, [visible]);
//   const fetchProgressStages = async () => {
//     setIsLoading(true);
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/progress/admin-project-stages/${projectId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setProgressStages(response.data.data || []);

//       } else {
//         Alert.alert('Error', 'Failed to load progress stages.');
//       }
//     } catch (error) {
//       console.error('Error fetching progress stages:', error);
//       Alert.alert('Error', 'Failed to fetch progress stages.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const openGallery = () => {
//     const options = {
//       mediaType: 'mixed',
//       selectionLimit: 0,
//     };

//     ImagePicker.launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.error('ImagePicker Error: ', response.error);
//       } else {
//         setFiles(prevFiles => [...prevFiles, ...response.assets]);
//       }
//     });
//   };

//   const openCamera = () => {
//     const options = {
//       mediaType: 'mixed',
//       cameraType: 'back',
//       saveToPhotos: true,
//     };

//     ImagePicker.launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled camera');
//       } else if (response.error) {
//         console.error('Camera Error: ', response.error);
//       } else {
//         setFiles(prevFiles => [...prevFiles, response.assets[0]]);
//       }
//     });
//   };

//   const handleSave = async () => {
//     if (!selectedStage || files.length === 0) {
//       Alert.alert('Error', 'Please select a stage and upload files.');
//       return;
//     }

//     const token = await AsyncStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('projectId', projectId);
//     formData.append('stage', selectedStage);
//     files.forEach(file => {
//       formData.append('files', {
//         uri: file.uri,
//         type: file.type,
//         name: file.fileName || 'file',
//       });
//     });
//     formData.append('date', new Date().toISOString().split('T')[0]);

//     try {
//       const response = await axios.post(
//         `${API_URL}/progress`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log('Response:', response.data);
//       Alert.alert('Success', 'Progress saved successfully!');
//       fetchProgressData(); // Refresh progress data
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error('Error saving progress:', error);
//       Alert.alert('Error', 'Failed to save progress.');
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}>
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.modalContainer}>
//           <TouchableWithoutFeedback onPress={() => {}}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Add Progress</Text>
//               <Dropdown
//                 style={styles.dropdown}
//                 data={stages.map(stage => ({ label: stage, value: stage }))}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select Stage"
//                 value={selectedStage}
//                 onChange={item => setSelectedStage(item.value)}
//                 renderItem={item => (
//                   <Text style={{ color: 'black', padding: 10 }}>{item.label}</Text>
//                 )}
//                 selectedTextStyle={{ color: 'black', paddingHorizontal: 10 }}
//                 placeholderStyle={{ color: 'grey' }}
//               />

//               <TouchableOpacity style={styles.uploadButton} onPress={openGallery}>
//                 <Text style={styles.uploadButtonText}>Upload Images or Videos</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.uploadButton} onPress={openCamera}>
//                 <Text style={styles.uploadButtonText}>Open Camera</Text>
//               </TouchableOpacity>

//               {/* Display selected images */}
//               {files.length > 0 && (
//                 <ScrollView horizontal={true} style={styles.imagesContainer}>
//                   {files.map((file, index) => (
//                     <Image
//                       key={index}
//                       source={{ uri: file.uri }}
//                       style={styles.imagePreview}
//                     />
//                   ))}
//                 </ScrollView>
//               )}

//               <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.saveButtonText}>Save Progress</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,

//     marginBottom: 20,
//     fontFamily: "Prompt-Medium",
//     color:'black'
//   },
//   dropdown: {
//     width: '100%',
//     marginBottom: 20,
//     borderWidth: 0.3,
//     height: 50,
//   },
//   uploadButton: {
//     width: '100%',
//     backgroundColor: '#000000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   uploadButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//   },
//   saveButton: {
//     width: '100%',
//     backgroundColor: '#0277D3',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//   },
//   imagesContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   imagePreview: {
//     width: 80,
//     height: 80,
//     marginRight: 10,
//     borderRadius: 8,
//   },
// });

// export default AddProgressModal;
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/url';

const AddProgressModal = ({visible, onClose, project, fetchProgressData}) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [files, setFiles] = useState([]);

  // Map project.progressStages dynamically for the dropdown
  const progressStages = project.progressStages.map(stage => ({
    label: stage,
    value: stage,
  }));

  const openGallery = () => {
    const options = {mediaType: 'mixed', selectionLimit: 0};
    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        setFiles(prevFiles => [...prevFiles, ...response.assets]);
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'mixed',
      cameraType: 'back',
      saveToPhotos: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (!response.didCancel && !response.error) {
        setFiles(prevFiles => [...prevFiles, response.assets[0]]);
      }
    });
  };

  const handleSave = async () => {
    if (!selectedStage || files.length === 0) {
      Alert.alert('Error', 'Please select a stage and upload files.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('projectId', project._id);
    formData.append('stage', selectedStage);
    files.forEach(file => {
      formData.append('files', {
        uri: file.uri,
        type: file.type,
        name: file.fileName || 'file',
      });
    });
    formData.append('date', new Date().toISOString().split('T')[0]);

    try {
      const response = await axios.post(`${API_URL}/progress`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Success', 'Progress saved successfully!');
      fetchProgressData();
      onClose();
    } catch (error) {
      console.error('Error saving progress:', error);
      Alert.alert('Error', 'Failed to save progress.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Progress</Text>

              <Dropdown
                style={styles.dropdown}
                data={progressStages}
                labelField="label"
                valueField="value"
                placeholder="Select Stage"
                value={selectedStage}
                onChange={item => setSelectedStage(item.value)}
                renderItem={item => (
                  <Text style={{color: 'black', padding: 10}}>
                    {item.label}
                  </Text>
                )}
                selectedTextStyle={{color: 'black', paddingHorizontal: 10}}
                placeholderStyle={{color: 'grey'}}
              />

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={openGallery}>
                <Text style={styles.uploadButtonText}>
                  Upload Images or Videos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={openCamera}>
                <Text style={styles.uploadButtonText}>Open Camera</Text>
              </TouchableOpacity>

              {files.length > 0 && (
                <ScrollView horizontal={true} style={styles.imagesContainer}>
                  {files.map((file, index) => (
                    <Image
                      key={index}
                      source={{uri: file.uri}}
                      style={styles.imagePreview}
                    />
                  ))}
                </ScrollView>
              )}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Progress</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Prompt-Medium',
    color: 'black',
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 0.3,
    height: 50,
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#0277D3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  imagesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default AddProgressModal;
