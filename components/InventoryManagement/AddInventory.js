// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// import BackIcon from '../../assests/BackIcon';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import { API_URL } from '../../utils/url';

// export default function AddInventory() {
//   const route = useRoute();
//   const {inventory: initialInventory, project} = route.params;
//   const [inventory, setInventory] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedVideos, setSelectedVideos] = useState([]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     // Reset inventory when component mounts or initialInventory changes
//     setInventory(
//       initialInventory.map(item => ({
//         ...item,
//         quantity: '', // Clear out quantities
//       })),
//     );
//   }, [initialInventory]);

//   const handleQuantityChange = (index, value) => {
//     const updatedInventory = [...inventory];
//     updatedInventory[index].quantity = value;
//     setInventory(updatedInventory);
//   };
//   const handleSelectMedia = () => {
//     launchImageLibrary({mediaType: 'mixed', selectionLimit: 1}, response => {
//       if (response.assets && response.assets.length > 0) {
//         const asset = response.assets[0];
//         if (asset.type.startsWith('image/')) {
//           setSelectedImages([asset]);
//           setSelectedVideos([]);
//         } else if (asset.type.startsWith('video/')) {
//           setSelectedVideos([asset]);
//           setSelectedImages([]);
//         }
//       }
//     });
//   };

//   const handleSendRequest = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const formData = new FormData();

//       formData.append('projectId', project._id);
//       formData.append('contractorId', '6697c59fff40c409cc29293d');

//       const materials = inventory
//         .filter(item => item.quantity !== '')
//         .map(item => ({
//           itemName: item.itemName,
//           quantity: parseInt(item.quantity) || 0,
//           units: item.units || 'units',
//         }));
//       formData.append('materials', JSON.stringify(materials));

//       formData.append('adminId', '6697c2096bbb63be1d2e9c90');

//       const selectedFile = [...selectedImages, ...selectedVideos][0];
//       if (selectedFile) {
//         formData.append('files', {
//           uri: selectedFile.uri,
//           name:
//             selectedFile.fileName || `file.${selectedFile.type.split('/')[1]}`,
//           type: selectedFile.type,
//         });
//       }

//       console.log('formData', formData);

//       if (token) {
//         const response = await axios.patch(
//           `${API_URL}/inventory/upload`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data',
//             },
//           },
//         );
//         console.log('Request sent successfully:', response.data);
//         Alert.alert('Success', 'Inventory added successfully');

//         // Reset inventory and selected files after successful API call
//         setInventory(initialInventory.map(item => ({...item, quantity: ''})));
//         setSelectedImages([]);
//         setSelectedVideos([]);
//       }
//     } catch (error) {
//       console.error('Error sending request:', error);
//       Alert.alert('Error', 'Failed to add inventory. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container2}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.mainHeader}>Add Items to Inventory</Text>
//       </View>

//       <ScrollView style={styles.inventoryList}>
//         <View style={styles.listHeader}>
//           <Text style={styles.columnHeader}>Item</Text>
//           <Text style={styles.columnHeader2}>Quantity</Text>
//         </View>
//         {inventory.map((material, index) => (
//           <View key={index} style={styles.inventoryItem}>
//             <Text style={styles.itemName}>{material.itemName}</Text>
//             <View style={styles.quantityInputContainer}>
//               <TextInput
//                 style={styles.quantityInput}
//                 placeholder="Type here..."
//                 placeholderTextColor="#A0A0A0"
//                 value={material.quantity.toString()}
//                 onChangeText={value => handleQuantityChange(index, value)}
//               />
//               <Text style={styles.unitText}>{material.units || 'Unit'}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.uploadButton} onPress={handleSelectMedia}>
//         <Text style={styles.saveButtonText}>Upload Images or Video</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.saveButton} onPress={handleSendRequest}>
//         <Text style={styles.saveButtonText}>Send Approval</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 16,
//   },
//   container2: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 30,
//     marginVertical: 20,
//     marginBottom: 50,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ECECEC',
//   },
//   container3: {
//     justifyContent: 'center',
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   mainHeader: {
//     fontSize: 18,
//     fontFamily: "Prompt-Medium",
//     color: '#333333',
//   },
//   inventoryList: {
//     flex: 1,
//     padding: 16,
//     borderWidth: 0.5,
//     borderColor: '#ECECEC',
//     borderRadius: 16,
//   },
//   listHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 26,
//   },
//   columnHeader: {
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//     color: '#0277D3',
//   },
//   inventoryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   itemName: {
//     fontSize: 14,
//     fontFamily: "Prompt-Medium",
//     color: 'black',
//     flex: 1,
//   },
//   quantityInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   quantityInput: {
//     flex: 1,
//     backgroundColor: '#F7F5FF',
//     borderRadius: 6,
//     padding: 8,
//     fontSize: 14,
//     marginRight: 8,
//     color: 'black',
//     fontFamily: "Prompt-Medium",
//   },
//   unitText: {
//     fontSize: 12,
//     color: '#333333',
//     width: 30,
//     fontFamily: "Prompt-Medium",
//   },
//   saveButton: {
//     backgroundColor: '#0277D3',
//     padding: 16,
//     alignItems: 'center',
//     margin: 16,
//     borderRadius: 8,
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//   },
//   columnHeader2: {
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//     color: '#0277D3',
//     marginRight: 60,
//   },
//   uploadButton: {
//     backgroundColor: 'black',
//     padding: 16,
//     alignItems: 'center',
//     margin: 16,
//     borderRadius: 8,
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import BackIcon from '../../assests/BackIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {API_URL} from '../../utils/url';

export default function AddInventory() {
  const route = useRoute();
  const {inventory: initialInventory, project} = route.params;
  const [inventory, setInventory] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    fetchItems();
    setInventory([{itemName: '', quantity: ''}]);
  }, []);

  const fetchItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/master`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
      Alert.alert('Error', 'Failed to fetch items.');
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedInventory = [...inventory];
    updatedInventory[index].quantity = value;
    setInventory(updatedInventory);
  };

  const handleItemChange = (index, item) => {
    const updatedInventory = [...inventory];
    updatedInventory[index].itemName = item;
    setInventory(updatedInventory);
  };

  const addNewItem = () => {
    setInventory([...inventory, {itemName: '', quantity: ''}]);
  };

  const removeItem = index => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
  };

  const handleSelectMedia = () => {
    Alert.alert('Select Media', 'Choose how you want to add media', [
      {
        text: 'Take Photo',
        onPress: () => handleCameraLaunch(),
      },
      {
        text: 'Choose from Gallery',
        onPress: () => handleGalleryLaunch(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.error('Camera Error:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImages([response.assets[0]]);
        setSelectedVideos([]);
      }
    });
  };

  const handleGalleryLaunch = () => {
    const options = {
      mediaType: 'mixed',
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.type.startsWith('image/')) {
          setSelectedImages([asset]);
          setSelectedVideos([]);
        } else if (asset.type.startsWith('video/')) {
          setSelectedVideos([asset]);
          setSelectedImages([]);
        }
      }
    });
  };
  const handleSendRequest = async () => {
    // Check if media is selected
    if (selectedImages.length === 0 && selectedVideos.length === 0) {
      Alert.alert(
        'Media Required',
        'Please add an image or video before sending approval',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
      );
      return;
    }

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();

      formData.append('projectId', project._id);
      formData.append('contractorId', '6697c59fff40c409cc29293d');

      const materials = inventory
        .filter(item => item.itemName !== '' && item.quantity !== '')
        .map(item => ({
          itemName: item.itemName,
          quantity: parseInt(item.quantity) || 0,
          units: 'units',
        }));

      // Check if there are any items in inventory
      if (materials.length === 0) {
        Alert.alert(
          'No Items Added',
          'Please add at least one item with quantity before sending approval',
          [
            {
              text: 'OK',
              style: 'default',
            },
          ],
        );
        setIsLoading(false);
        return;
      }

      formData.append('materials', JSON.stringify(materials));
      formData.append('adminId', '6697c2096bbb63be1d2e9c90');

      const selectedFile = [...selectedImages, ...selectedVideos][0];
      if (selectedFile) {
        formData.append('files', {
          uri: selectedFile.uri,
          name:
            selectedFile.fileName || `file.${selectedFile.type.split('/')[1]}`,
          type: selectedFile.type,
        });
      }

      if (token) {
        const response = await axios.patch(
          `${API_URL}/inventory/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        Alert.alert('Success', 'Inventory added successfully', [
          {
            text: 'OK',
            onPress: () => {
              setInventory([{itemName: '', quantity: ''}]);
              setSelectedImages([]);
              setSelectedVideos([]);
              navigation.goBack(); // Navigate back after success
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      Alert.alert('Error', 'Failed to add inventory. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Add Items to Inventory</Text>
      </View>

      <ScrollView style={styles.inventoryList}>
        <View style={styles.listHeader}>
          <Text style={styles.columnHeader}>Item</Text>
          <Text style={styles.columnHeader2}>Quantity</Text>
        </View>
        {inventory.map((material, index) => (
          <View key={index} style={styles.inventoryItem}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={items.map(item => ({label: item, value: item}))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              itemTextStyle={styles.dropdownItemText}
              value={material.itemName}
              onChange={item => handleItemChange(index, item.value)}
            />
            <TextInput
              style={styles.quantityInput}
              placeholder="Quantity"
              placeholderTextColor="#999"
              value={material.quantity}
              onChangeText={value => handleQuantityChange(index, value)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => removeItem(index)}
              style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonStyle}>
        <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
          <Text style={styles.addButtonText}>Add New Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleSelectMedia}>
          <Text style={styles.saveButtonText}>Add Media</Text>
        </TouchableOpacity>

        {selectedImages.length > 0 && (
          <View style={styles.mediaPreview}>
            <Image
              source={{uri: selectedImages[0].uri}}
              style={styles.previewImage}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleSendRequest}
          disabled={isLoading}>
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Sending...' : 'Send Approval'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginVertical: 20,
    marginBottom: 50,
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
  },
  inventoryList: {
    flex: 1,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
    borderRadius: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  columnHeader: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
    color: '#0277D3',
  },
  columnHeader2: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
    color: '#0277D3',
    marginRight: 60,
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  dropdown: {
    flex: 1,
    height: 50,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginRight: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  dropdownItemText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Prompt-Regular',
    borderBottomWidth: 0.5,
    borderColor: '#ECECEC',
  },
  quantityInput: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginRight: 8,
    color: 'black',
    fontFamily: 'Prompt-Regular',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  removeButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Prompt-Medium',
  },
  addButton: {
    backgroundColor: '#0277D3',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  uploadButton: {
    backgroundColor: 'black',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#0277D3',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  buttonStyle: {
    padding: 10,
  },
});
