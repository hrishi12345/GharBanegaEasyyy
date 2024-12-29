// import React from 'react';
// import { StyleSheet, View, Text, FlatList } from 'react-native';

// const ApprovedInventory = () => {
//   const inventoryItems = [
//     { id: '335231', updateRequest: 'Cement', date: '20/07/2024' },
//     { id: '335232', updateRequest: 'Steel', date: '21/07/2024' },
//     { id: '335233', updateRequest: 'Bricks', date: '22/07/2024' },
//     { id: '335234', updateRequest: 'Sand', date: '23/07/2024' },
//     { id: '335235', updateRequest: 'Gravel', date: '24/07/2024' },
//   ];

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <View style={styles.itemContent}>
//         <View style={styles.itemDetails}>
//           <Text style={styles.regId}>Reg.Id : # {item.id}</Text>
//           <Text style={styles.updateRequest}>
//             Update Request : {item.updateRequest}
//           </Text>
//         </View>
//         <Text style={styles.date}>Date : {item.date}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>

//       <FlatList
//         data={inventoryItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#242424',
//   },
//   listContainer: {
//     paddingBottom: 16,
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   regId: {
//     color: 'rgba(99,99,104,1)',
//     fontSize: 12,
//     lineHeight: 16,
//     fontFamily: 'Prompt, sans-serif',
//     fontWeight: '400',
//     marginBottom: 4,
//   },
//   updateRequest: {
//     color: 'rgba(36,36,36,1)',
//     fontSize: 14,
//     lineHeight: 18,
//     fontFamily: 'Prompt, sans-serif',
//     fontWeight: '400',
//   },
//   date: {
//     color: 'rgba(99,99,104,1)',
//     fontSize: 12,
//     lineHeight: 16,
//     fontFamily: 'Prompt, sans-serif',
//     fontWeight: '400',
//     textAlign: 'right',
//   },
// });

// export default ApprovedInventory;
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { API_URL } from '../../utils/url';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ApprovedInventory = ({ projectId }) => {
//   const [inventoryItems, setInventoryItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchInventoryData();
//   }, []);

//   const fetchInventoryData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get(
//         `${API_URL}/inventory/approved-inventories?projectId=${projectId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const data = response.data;

//       if (!data || !data.inventory) {
//         throw new Error('Invalid response data');
//       }
//     console.log('data',response.data)
//       const { reducedInventories, uploadedInventories } = data.inventory;
//       console.log('Reduced Inventories:', reducedInventories);
//       const formattedData = [
//         ...(reducedInventories || []).map(item => ({
//           id: item._id.slice(-6),
//           type: 'reduce',
//           items: item.items,
//           date: formatDate(item.createdAt),
//         })),
//         ...(uploadedInventories || []).map(item => ({
//           id: item._id.slice(-6),
//           type: 'update',
//           items: item.requestedItems,
//           date: formatDate(item.createdAt),
//         })),
//       ];

//       setInventoryItems(formattedData);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching inventory data:', err);
//       setError('Failed to load inventory data. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     }).replace(/\//g, '/');
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <View style={styles.itemContent}>
//         <View style={styles.itemDetails}>
//           <Text style={styles.regId}>Reg.Id : # {item.id}</Text>
//           <Text style={styles.updateRequest}>
//             {item.type === 'update' ? 'Update' : 'Reduce'} Request: {formatItems(item.items)}
//           </Text>
//         </View>
//         <Text style={styles.date}>Date : {item.date}</Text>
//       </View>
//       <View style={styles.approvedContainer}>
//         <Text style={styles.approvedText}>Approved</Text>
//       </View>
//     </View>
//   );

//   const formatItems = (items) => {
//     return items.map(item => `${item.itemName} (${item.quantity} ${item.units})`).join(', ');
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   if (inventoryItems.length === 0) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <Text style={styles.noDataText}>No data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={inventoryItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   centered: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     fontFamily: "Prompt-Medium",
//   },
//   noDataText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'rgba(99,99,104,1)',
//     fontFamily: "Prompt-Medium",
//   },
//   listContainer: {
//     paddingBottom: 16,
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   regId: {
//     color: 'rgba(99,99,104,1)',
//     fontSize: 12,
//     lineHeight: 16,
//     fontFamily: "Prompt-Medium",
//     marginBottom: 4,
//   },
//   updateRequest: {
//     color: 'rgba(36,36,36,1)',
//     fontSize: 14,
//     lineHeight: 18,
//     fontFamily: "Prompt-Medium",
//     flexWrap: 'wrap',
//   },
//   date: {
//     color: 'rgba(99,99,104,1)',
//     fontSize: 12,
//     lineHeight: 16,
//     fontFamily: "Prompt-Medium",
//     textAlign: 'right',
//   },
//   approvedContainer: {
//     position: 'absolute',
//     bottom: 8,
//     right: 16,
//   },
//   approvedText: {
//     fontSize: 14,
//     color: '#0277D3',
//     fontWeight: 'bold',
//     fontFamily: "Prompt-Medium",
//   },
// });

// export default ApprovedInventory;

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '../../utils/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ApprovedInventory = ({projectId}) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/inventory/approved-inventories?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;

      if (!data || !data.inventory) {
        throw new Error('Invalid response data');
      }

      const {reducedInventories, uploadedInventories} = data.inventory;

      const formattedData = [
        ...(reducedInventories || []).map(item => ({
          id: item._id,
          type: 'reduce',
          items: item.items,
          date: new Date(item.createdAt),
          timestamp: new Date(item.createdAt).getTime(),
          media: item.media || [],
        })),
        ...(uploadedInventories || []).map(item => ({
          id: item._id,
          type: 'update',
          items: item.requestedItems,
          date: new Date(item.createdAt),
          timestamp: new Date(item.createdAt).getTime(),
          media: item.media || [],
        })),
      ].sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first

      setInventoryItems(formattedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching inventory data:', err);
      setError('Failed to load inventory data. Please try again later.');
      setLoading(false);
    }
  };

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deleteInventoryItem = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${API_URL}/inventory/${selectedItem.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchInventoryData();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}>
        <View style={styles.itemDetails}>
          <Text style={styles.regId}>Reg.Id : #{item.id.slice(0, 4)}</Text>
          <Text style={styles.updateRequest}>
            {item.type === 'update' ? 'Update' : 'Reduce'} Request:{' '}
            {formatItems(item.items)}
          </Text>
        </View>
        <Text style={styles.date}>Date: {formatDate(item.date)}</Text>
      </TouchableOpacity>
     
      <View style={styles.approvedContainer}>
        <Text style={styles.approvedText}>Approved</Text>
      </View>
    </View>
  );

  const formatItems = items => {
    return items
      .map(item => `${item.itemName} (${item.quantity} ${item.units})`)
      .join(', ');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (inventoryItems.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={inventoryItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Details Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalRegId}>
                    Reg.Id : #{selectedItem.id.slice(0, 4)}
                  </Text>
                  <Text style={styles.modalDate}>
                    {formatDate(selectedItem.date)}
                  </Text>
                </View>
                <Text style={styles.modalUpdateRequest}>
                  {selectedItem.type === 'update' ? 'Update' : 'Reduce'} Request
                </Text>
                <View style={styles.modalItemsContainer}>
                  {selectedItem.items.map((item, index) => (
                    <View key={index} style={styles.modalItem}>
                      <Text style={styles.modalItemName}>{item.itemName}</Text>
                      <Text style={styles.modalQuantity}>
                        Quantity: {item.quantity} {item.units}
                      </Text>
                    </View>
                  ))}
                </View>
                {selectedItem.type === 'update' &&
                  selectedItem.media &&
                  selectedItem.media.length > 0 && (
                    <View style={styles.imageContainer}>
                      {selectedItem.media.map((media, index) => (
                        <Image
                          key={index}
                          source={{uri: media.compressedUrl}}
                          style={styles.image}
                        />
                      ))}
                    </View>
                  )}
              </>
            )}
          </View>
        </Pressable>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDeleteModalVisible(false)}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalText}>
              Are you sure you want to delete this item?
            </Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={[styles.deleteModalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.deleteModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteModalButton, styles.confirmButton]}
                onPress={deleteInventoryItem}>
                <Text style={styles.deleteModalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Prompt-Medium',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'rgba(99,99,104,1)',
    fontFamily: 'Prompt-Medium',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemDetails: {
    flex: 1,
  },
  regId: {
    color: 'rgba(99,99,104,1)',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  updateRequest: {
    color: 'rgba(36,36,36,1)',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Prompt-Medium',
    flexWrap: 'wrap',
  },
  date: {
    color: 'rgba(99,99,104,1)',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Prompt-Medium',
    textAlign: 'right',
  },
  approvedContainer: {
    position: 'absolute',
    bottom: 8,
    right: 16,
  },
  approvedText: {
    fontSize: 14,
    color: '#0277D3',
    fontWeight: 'bold',
    fontFamily: 'Prompt-Medium',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    bottom: 25,
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    width: '80%',
  },
  deleteModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    width: '80%',
  },
  deleteModalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Prompt-Medium',
    color: 'rgba(36,36,36,1)',
  },
  deleteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deleteModalButton: {
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
  },
  deleteModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalRegId: {
    fontSize: 14,
    color: 'rgba(99,99,104,1)',
    fontFamily: 'Prompt-Medium',
  },
  modalDate: {
    fontSize: 14,
    color: 'rgba(99,99,104,1)',
    fontFamily: 'Prompt-Medium',
  },
  modalUpdateRequest: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    marginBottom: 15,
    color: 'rgba(99,99,104,1)',
  },
  modalItemsContainer: {
    marginBottom: 20,
  },
  modalItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  modalItemName: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
    color: 'rgba(99,99,104,1)',
    marginBottom: 4,
  },
  modalQuantity: {
    fontSize: 14,
    color: 'rgba(99,99,104,1)',
    fontFamily: 'Prompt-Medium',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default ApprovedInventory;
