// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { API_URL } from '../../utils/url';

// const RequestedHistory = ({ projectId }) => {
//   const [inventoryData, setInventoryData] = useState({});
//   const [allItems, setAllItems] = useState([]);
//   const [dates, setDates] = useState([]);
//   const scrollViewRef = useRef(null);

//   const screenWidth = Dimensions.get('window').width;
//   const itemColumnWidth = screenWidth * 0.2;
//   const dateColumnWidth = screenWidth * 0.25;

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await axios.get(
//           `${API_URL}/inventory/request-history?projectId=${projectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         setInventoryData(response.data);
//         setDates(Object.keys(response.data));

//         // Process items
//         const itemsWithData = new Set();
//         Object.values(response.data).forEach(dateRequests => {
//           dateRequests.forEach(request => {
//             request.requestedItems.forEach(item => {
//               if (item.quantity > 0) {
//                 itemsWithData.add(item.itemName);
//               }
//             });
//           });
//         });

//         setAllItems(Array.from(itemsWithData));
//       } catch (error) {
//         console.error('Error fetching inventory history:', error);
//       }
//     };

//     fetchInventory();
//   }, [projectId]);

//   const getItemQuantities = (itemName) => {
//     return dates.map(date => {
//       const totalQuantity = inventoryData[date]?.reduce((sum, request) => {
//         const matchingItems = request.requestedItems.filter(item => item.itemName === itemName);
//         return sum + matchingItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
//       }, 0);

//       return totalQuantity ? `${totalQuantity} units` : '-';
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.tableContainer}>
//         <View style={styles.fixedColumn}>
//         {allItems.length >0 ?<Text style={[styles.headerText, { width: itemColumnWidth }]}>Item</Text> :<Text></Text>}
//           {allItems.map((item, index) => (
//             <Text key={item} style={[styles.itemText, { width: itemColumnWidth }]}>{item}</Text>
//           ))}
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View>
//             <View style={styles.headerRow}>
//               {dates.map(date => (
//                 <Text key={date} style={[styles.headerText, { width: dateColumnWidth }]}>
//                   {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: '2-digit', year: '2-digit' })}
//                 </Text>
//               ))}
//             </View>
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
//     marginHorizontal: 10,
//   },
//   tableContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   headerRow: {
//     flexDirection: 'row',
//   },
//   headerText: {

//     fontSize: 14,
//     color: '#0277D3',
//     textAlign: 'center',
//     padding: 10,
//     fontFamily: "Prompt-Bold",
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//     padding: 10,
//     fontFamily: "Prompt-Bold"
//   },
//   quantityText: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//     padding: 10,
//     fontFamily: "Prompt-Medium",
//   },
// });

// export default RequestedHistory;
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../utils/url';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const RequestedHistory = ({projectId}) => {
  const [inventoryData, setInventoryData] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [dates, setDates] = useState([]);
  const scrollViewRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const itemColumnWidth = screenWidth * 0.2;
  const dateColumnWidth = screenWidth * 0.25;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `${API_URL}/inventory/request-history?projectId=${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        setInventoryData(response.data);
        // Sort dates in descending order (newest first)
        const sortedDates = Object.keys(response.data).sort((a, b) => {
          return new Date(b) - new Date(a);
        });
        setDates(sortedDates);

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
        console.error('Error fetching inventory history:', error);
      }
    };

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

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.row}>
        <View style={styles.itemColumn}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
        <View style={styles.quantitiesRow}>
          {getItemQuantities(item).map((quantity, dateIndex) => (
            <View
              key={`${item}-${dateIndex}`}
              style={[styles.quantityCell, {width: dateColumnWidth}]}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
          ))}
        </View>
      </View>
    ),
    [dates, getItemQuantities, dateColumnWidth],
  );

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
          {allItems.map(item => (
            <View
              key={item}
              style={[styles.itemCell, {width: itemColumnWidth}]}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
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
              {allItems.map(item => (
                <View key={item} style={styles.row}>
                  {getItemQuantities(item).map((quantity, dateIndex) => (
                    <View
                      key={`${item}-${dateIndex}`}
                      style={[styles.quantityCell, {width: dateColumnWidth}]}>
                      <Text style={styles.quantityText}>{quantity}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
    margin:responsiveWidth(2),
    marginHorizontal:responsiveWidth(2),
  },
  tableContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  fixedColumn: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44, // Fixed height for consistent rows
  },
  itemCell: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  quantityCell: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  headerText: {
    fontSize: 14,
    color: '#0277D3',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Prompt-Bold',
  },
  itemText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'left',
    fontFamily: 'Prompt-Bold',
  },
  quantityText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Prompt-Medium',
  },
  quantitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RequestedHistory;
