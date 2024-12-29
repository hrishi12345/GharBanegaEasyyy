// import React, { useState } from "react";
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
// import BackIcon from "../assests/BackIcon";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { TOUCHABLE_STATE } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
// export default function InventoryManagement() {
//   const [activeTab, setActiveTab] = useState("attendance");
//   const navigation=useNavigation()
//   const route = useRoute();
//   const { projectData} = route.params;
//   console.log(projectData)
//   const project = {
//     name: "City Center Mall Expansion",
//     site: "Downtown Plaza",
//     description: "Expanding the existing mall with a new wing and modernizing the food court area."
//   };

//   const workers = [
//     { name: "John Smith", contact: "9944665588", image: "https://picsum.photos/id/1/100" },
//     { name: "Emma Johnson", contact: "9955776633", image: "https://picsum.photos/id/2/100" },
//     { name: "Michael Brown", contact: "9966887744", image: "https://picsum.photos/id/3/100" },
//     { name: "Sarah Davis", contact: "9977998855", image: "https://picsum.photos/id/4/100" },
//     { name: "David Wilson", contact: "9988009966", image: "https://picsum.photos/id/5/100" },
//   ];

//   return (
//     <View style={styles.container}>
//        <View style={styles.container2}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <BackIcon />
//             </TouchableOpacity>

//       <Text style={styles.mainHeader}>Inventory Management</Text>
//       </View>
//       <View style={styles.projectInfo}>
//         <Text style={styles.projectName}>{projectData.projectName}</Text>
//         <Text style={styles.projectSite}>Site: {projectData.projectCity}</Text>
//         <Text style={styles.projectDescription}>{project.description}</Text>
//       </View>

//       <TouchableOpacity style={styles.buttonPrimary}  onPress={() => navigation.navigate('Raise')}>
//         <Text style={styles.buttonTextLight}>Raise Receipt</Text>
//       </TouchableOpacity>
//       <View style={styles.inventoryList}>
//         {['Cement', 'Sand', 'Steel Bar', 'Crushed Stones', 'Bricks'].map((item, index) => (
//           <View key={index} style={styles.inventoryItem}>
//             <Text style={styles.itemName}>{item}</Text>
//             <View style={styles.quantityBox}>
//               <Text style={styles.quantityText}>
//                 {item === 'Bricks' ? '300 Bricks' : '4 Bags'}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.buttonSecondary}  onPress={() => navigation.navigate('ReduceInventory')}>
//         <Text style={styles.buttonTextLight}>Reduce Inventory</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('AddInventory')}>
//         <Text style={styles.buttonTextDark}>Add Items to Inventory</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEFEFE",
//     padding: 16,
//   },
//     container2:{
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     gap:30
//   },
//     mainHeader: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#333333",
//     textAlign: "center",
//     marginVertical: 16,
//   },
//   header: {
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#333333",
//   },
//   projectInfo: {
//     borderWidth: 1,
//     borderColor: "#ECECEC",
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 16,
//   },
//   projectSite: {
//     color: "#333333",
//     fontSize: 12,
//     fontWeight: "500",
//     marginBottom: 4,
//   },
//   projectName: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#0277D3",
//     marginBottom: 8,
//   },
//   siteInfo: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#333333",
//     marginBottom: 8,
//   },
//   projectDescription: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#333333",
//   },
//   buttonPrimary: {
//     backgroundColor: "#333333",
//     borderRadius: 6,
//     padding: 12,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   buttonSecondary: {
//     backgroundColor: "#0277D3",
//     borderRadius: 6,
//     padding: 12,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   buttonOutline: {
//     borderWidth: 1,
//     borderColor: "#0277D3",
//     borderRadius: 6,
//     padding: 12,
//     alignItems: "center",
//   },
//   buttonTextLight: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   buttonTextDark: {
//     color: "#0277D3",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   inventoryList: {
//     borderWidth: 1,
//     borderColor: "#ECECEC",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//   },
//   inventoryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   itemName: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#333333",
//   },
//   quantityBox: {
//     backgroundColor: "#F7F5FF",
//     borderRadius: 12,
//     padding: 8,
//   },
//   quantityText: {
//     fontSize: 10,
//     fontWeight: "500",
//     color: "#242424",

//   },
// });
// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackIcon from '../assests/BackIcon';
// import { API_URL } from '../utils/url';

// export default function InventoryManagement() {
//   const [inventory, setInventory] = useState([]);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {project} = route.params;

//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         console.log('Token:', token);

//         if (token) {
//           const response = await axios.get(
//             `${API_URL}/inventory?projectId=${project._id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );
//           setInventory(response.data.inventories[0].materials);
//         }
//       } catch (error) {
//         console.error('Error fetching inventory data:', error);
//       }
//     };

//     fetchInventoryData();
//   }, [project._id]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.container2}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.mainHeader}>Inventory Management</Text>
//       </View>

//       <View style={styles.projectInfo}>
//         <Text style={styles.projectName}>{project.projectName}</Text>
//         <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.buttonPrimary}
//         onPress={() => navigation.navigate('Raise', {inventory, project})}>
//         <Text style={styles.buttonTextLight}>Raise Receipt</Text>
//       </TouchableOpacity>
//       <View style={styles.inventoryList}>
//         {inventory.map((material, index) => (
//           <View key={material._id} style={styles.inventoryItem}>
//             <Text style={styles.itemName}>{material.itemName}</Text>
//             <View style={styles.quantityBox}>
//               <Text style={styles.quantityText}>
//                 {material.quantity} {material.units}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity
//         style={styles.buttonSecondary}
//         onPress={() => navigation.navigate('ReduceInventory', {inventory})}>
//         <Text style={styles.buttonTextLight}>Reduce Inventory</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.buttonOutline}
//         onPress={() =>
//           navigation.navigate('AddInventory', {inventory, project})
//         }>
//         <Text style={styles.buttonTextDark}>Add Items to Inventory</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFEFE',
//     padding: 16,
//   },
//   container2: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 30,
//   },
//   mainHeader: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#333333',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   projectInfo: {
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 16,
//   },
//   projectName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#0277D3',
//     marginBottom: 8,
//   },
//   projectSite: {
//     color: '#333333',
//     fontSize: 12,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   buttonPrimary: {
//     backgroundColor: '#333333',
//     borderRadius: 6,
//     padding: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonSecondary: {
//     backgroundColor: '#0277D3',
//     borderRadius: 6,
//     padding: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonOutline: {
//     borderWidth: 1,
//     borderColor: '#0277D3',
//     borderRadius: 6,
//     padding: 12,
//     alignItems: 'center',
//   },
//   buttonTextLight: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   buttonTextDark: {
//     color: '#0277D3',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   inventoryList: {
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//     flex: 1,
//   },
//   inventoryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333333',
//     marginBottom: 8,
//   },
//   materialItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4,
//   },
//   materialName: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   materialQuantity: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   quantityBox: {
//     backgroundColor: '#F7F5FF',
//     borderRadius: 12,
//     padding: 8,
//   },
//   quantityText: {
//     fontSize: 10,
//     fontWeight: '500',
//     color: '#242424',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../assests/BackIcon';
import {API_URL} from '../utils/url';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const {project} = route.params;

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);

        if (token) {
          const response = await axios.get(
            `${API_URL}/inventory?projectId=${project._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setInventory(response.data.inventories[0]?.materials || []);
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        setError('Failed to fetch inventory data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventoryData();
  }, [project._id]);

  const renderInventoryContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0277D3" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (inventory.length === 0) {
      return <Text style={styles.noMaterialsText}>No materials available</Text>;
    }

    return (
      <View style={styles.inventoryList}>
        {inventory.map((material, index) => (
          <View key={material._id} style={styles.inventoryItem}>
            <Text style={styles.itemName}>{material.itemName}</Text>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>
                {material.quantity} {material.units}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Inventory Management</Text>
      </View>

      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate('Raise', {inventory, project})}>
        <Text style={styles.buttonTextLight}>Raise Receipt</Text>
      </TouchableOpacity>

      {renderInventoryContent()}

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('ReduceInventory', {inventory})}>
        <Text style={styles.buttonTextLight}>Reduce Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() =>
          navigation.navigate('AddInventory', {inventory, project})
        }>
        <Text style={styles.buttonTextDark}>Add Items to Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    padding: 16,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  mainHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  projectInfo: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  projectName: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    color: '#0277D3',
    marginBottom: 8,
  },
  projectSite: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  buttonPrimary: {
    backgroundColor: '#333333',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonSecondary: {
    backgroundColor: '#0277D3',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#0277D3',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  buttonTextLight: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  buttonTextDark: {
    color: '#0277D3',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  inventoryList: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flex: 1,
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
    marginBottom: 8,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  materialName: {
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
  },
  materialQuantity: {
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
  },
  quantityBox: {
    backgroundColor: '#F7F5FF',
    borderRadius: 12,
    padding: 8,
  },
  quantityText: {
    fontSize: 10,
    fontFamily: 'Prompt-Medium',
    color: '#242424',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  noMaterialsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Prompt-Medium',
  },
});
