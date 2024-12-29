// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { API_URL } from '../../utils/url';

// const RequestedInventory = ({ projectId }) => {
//   const [inventoryData, setInventoryData] = useState({});
//   const [allItems, setAllItems] = useState([]);
//   const [dates, setDates] = useState([]);
//   const scrollViewRef = useRef(null);

//   const screenWidth = Dimensions.get('window').width;
//   const itemColumnWidth = screenWidth * 0.2; // 30% of screen width
//   const dateColumnWidth = screenWidth * 0.25; // 35% of screen width

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await axios.get(
//           `${API_URL}/inventory/inventory-requests?projectId=${projectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const flattenedData = Object.entries(response.data);
//         setInventoryData(flattenedData.reduce((acc, [date, items]) => {
//           acc[date] = items;
//           return acc;
//         }, {}));

//         const uniqueItems = Array.from(new Set(flattenedData.flatMap(([_, items]) => items.map(item => item.itemName))));
//         setAllItems(uniqueItems);

//         const dateKeys = Object.keys(response.data);
//         setDates(dateKeys);
//       } catch (error) {
//         console.error('Error fetching inventory:', error);
//       }
//     };

//     fetchInventory();
//   }, [projectId]);

//   const getItemQuantities = (itemName) => {
//     return dates.map(date => {
//       const item = inventoryData[date]?.find(i => i.itemName === itemName);
//       return item ? `${item.quantity} ${item.units}` : '-';
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.tableContainer}>
//         <View style={styles.fixedColumn}>
//           <Text style={[styles.headerText, { width: itemColumnWidth }]}>Item</Text>
//           {allItems.map((item, index) => (
//             <Text key={item} style={[styles.itemText, { width: itemColumnWidth }]}>{item}</Text>
//           ))}
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View>
//           <View style={styles.headerRow}>
//   {dates.map(date => (
//     <Text key={date} style={[styles.headerText, { width: dateColumnWidth }]}>
//       {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: '2-digit', year: '2-digit' })}
//     </Text>
//   ))}
// </View>

//             <ScrollView ref={scrollViewRef}>
//               {allItems.map((item, itemIndex) => (
//                 <View key={item} style={styles.row}>
//                   {getItemQuantities(item).map((quantity, dateIndex) => (
//                     <Text
//                       key={`${item}-${dateIndex}`}
//                       style={[styles.quantityText, { width: dateColumnWidth }]}
//                     >
//                       {quantity}
//                     </Text>
//                   ))}
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </ScrollView>
//       </View>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Request Completed</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 5,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     marginHorizontal: 5,
//   },
//   tableContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },

//   headerRow: {
//     flexDirection: 'row',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#0277D3',
//     textAlign: 'center',
//     padding: 10,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//     padding: 10,
//   },
//   quantityText: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//     padding: 10,
//   },
//   button: {
//     marginTop: 16,
//     backgroundColor: '#0277D3',
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default RequestedInventory;
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {all} from 'axios';
import {API_URL} from '../../utils/url';

const RequestedInventory = ({projectId}) => {
  const [inventoryData, setInventoryData] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [dates, setDates] = useState([]);
  const scrollViewRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const itemColumnWidth = screenWidth * 0.2;
  const dateColumnWidth = screenWidth * 0.25;

  const fetchInventory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/inventory/inventory-requests?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setInventoryData(response.data);
      setDates(Object.keys(response.data));

      // Process items
      const itemsWithData = new Set();
      Object.values(response.data).forEach(dateRequests => {
        dateRequests.forEach(request => {
          request.requestedItems.forEach(item => {
            if (item.quantity > 0) {
              itemsWithData.add(item.itemName);
            }
          });
        });
      });

      setAllItems(Array.from(itemsWithData));
    } catch (error) {
      console.error('Error fetching inventory:', error);
      Alert.alert('Error', 'Failed to fetch inventory data. Please try again.');
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [projectId]);

  const getItemQuantities = itemName => {
    return dates.map(date => {
      const totalQuantity = inventoryData[date]?.reduce((sum, request) => {
        const matchingItems = request.requestedItems.filter(
          item => item.itemName === itemName,
        );
        return (
          sum +
          matchingItems.reduce((itemSum, item) => itemSum + item.quantity, 0)
        );
      }, 0);

      return totalQuantity ? `${totalQuantity} units` : '-';
    });
  };

  const handleRequestCompleted = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const requestIds = Object.values(inventoryData).flatMap(dateRequests =>
        dateRequests.map(request => request.id),
      );

      await axios.post(
        `${API_URL}/inventory/approve-requests`,
        {
          projectId: projectId,
          requestIds: requestIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      Alert.alert('Success', 'Requests approved successfully');
      fetchInventory(); // Refresh the inventory data
    } catch (error) {
      console.error('Error approving requests:', error);
      Alert.alert('Error', 'Failed to approve requests. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.fixedColumn}>
          {allItems.length > 0 ? (
            <Text style={[styles.headerText, {width: itemColumnWidth}]}>
              Item
            </Text>
          ) : (
            <Text></Text>
          )}
          {allItems.map((item, index) => (
            <Text
              key={item}
              style={[styles.itemText, {width: itemColumnWidth}]}>
              {item}
            </Text>
          ))}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerRow}>
              {dates.map(date => (
                <Text
                  key={date}
                  style={[styles.headerText, {width: dateColumnWidth}]}>
                  {new Date(date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: '2-digit',
                    year: '2-digit',
                  })}
                </Text>
              ))}
            </View>
            <ScrollView ref={scrollViewRef}>
              {allItems.map((item, itemIndex) => (
                <View key={item} style={styles.row}>
                  {getItemQuantities(item).map((quantity, dateIndex) => (
                    <Text
                      key={`${item}-${dateIndex}`}
                      style={[styles.quantityText, {width: dateColumnWidth}]}>
                      {quantity}
                    </Text>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRequestCompleted}>
        <Text style={styles.buttonText}>Request Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 10,
  },
  tableContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 14,
    color: '#0277D3',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Prompt-Bold',
  },
  row: {
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Prompt-Bold',
  },
  quantityText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Prompt-Medium',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#0277D3',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
  },
});

export default RequestedInventory;
