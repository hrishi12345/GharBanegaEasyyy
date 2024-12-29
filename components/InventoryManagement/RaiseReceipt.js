import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import BackIcon from '../../assests/BackIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/url';
import {Dropdown} from 'react-native-element-dropdown';

export default function RaiseReceipt() {
  const route = useRoute();
  const {project} = route.params;
  const navigation = useNavigation();

  const [inventory, setInventory] = useState([{itemName: '', quantity: ''}]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/master`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Items:', response.data.items);
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
      Alert.alert('Error', 'Failed to fetch items.');
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
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

  const handleSendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

      const requestData = {
        projectId: project._id,
        materials: inventory
          .filter(item => item.itemName !== '')
          .map(material => ({
            itemName: material.itemName,
            quantity: material.quantity,
            units: 'units',
          })),
        adminId: '6697c2096bbb63be1d2e9c90',
        date: formatDate(),
      };

      if (token) {
        const response = await axios.post(
          `${API_URL}/inventory/raise-request`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Request sent successfully:', response.data);
        Alert.alert('Success', 'Request raised successfully');

        // Reset inventory
        setInventory([{itemName: '', quantity: ''}]);
        navigation.goBack(); // Navigate back after success
      }
    } catch (error) {
      console.error('Error sending request:', error);
      Alert.alert('Error', 'Failed to raise request. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Raise Receipt</Text>
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

      <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
        <Text style={styles.addButtonText}>Add New Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSendRequest}>
        <Text style={styles.saveButtonText}>Send Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerContainer: {
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
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,

    borderRadius: 8,
    padding: 12,
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
  saveButton: {
    backgroundColor: 'black',
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
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
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

  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
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
    placeholderTextColor: '#ECECEC',
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
});

// import React, { useState } from "react";
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";

// import BackIcon from "../../assests/BackIcon";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function RaiseReceipt() {
//   const [inventoryItems, setInventoryItems] = useState([
//     { name: "Cement", quantity: "" },
//     { name: "Sand", quantity: "" },
//     { name: "Steel Bar", quantity: "" },
//     { name: "Crushed Stones", quantity: "" },
//     { name: "Bricks", quantity: "" },
//   ]);
//   const route = useRoute();
//   const { inventory,projectData} = route.params;
//   console.log('asdasasdadasda',inventory)
//   console.log(projectData)
//   const handleQuantityChange = (index, value) => {
//     const updatedItems = [...inventoryItems];
//     updatedItems[index].quantity = value;
//     setInventoryItems(updatedItems);
//   };
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container2}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <BackIcon />
//             </TouchableOpacity>

//       <Text style={styles.mainHeader}>Raise Receipt</Text>
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
//                 value={material.quantity}
//                 onChangeText={(value) => handleQuantityChange(index, value)}
//               />
//               <Text style={styles.unitText}>Unit</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <TouchableOpacity style={styles.saveButton}>
//         <Text style={styles.saveButtonText}>Send Request</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//   },container2:{
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     gap:30,
//     marginVertical:20,
//     marginBottom:50
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ECECEC',
//   },
//   container3:{
//     justifyContent:'center'
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   mainHeader: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#333333",
//   },
//   inventoryList: {
//     flex: 1,
//     padding: 16,
//     borderWidth:0.5,
//     borderColor:'#ECECEC',
//     borderRadius:16
//   },
//   listHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 26,
//   },
//   columnHeader: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#0277D3",
//   },
//   inventoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: "400",
//     color: "#333333",
//     flex: 1,
//   },
//   quantityInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   quantityInput: {
//     flex: 1,
//     backgroundColor: "#F7F5FF",
//     borderRadius: 6,
//     padding: 8,
//     fontSize: 14,
//     marginRight: 8,
//     color:'black'
//   },
//   unitText: {
//     fontSize: 12,
//     color: "#333333",
//     width: 30,
//   },
//   saveButton: {
//     backgroundColor: "black",
//     padding: 16,
//     alignItems: "center",
//     margin: 16,
//     borderRadius: 8,
//   },
//   saveButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   columnHeader2: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#0277D3",
//     marginRight:60
//   },
// });
