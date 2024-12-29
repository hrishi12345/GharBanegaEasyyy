// import React, { useState } from 'react';
// import { StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native';

// const PendingInventory = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const inventoryItems = [
//     { id: '335231', updateRequest: 'Cement', date: '20/07/2024', previousQuantity: '8 Bags', updatedQuantity: '8 Bags' },
//     { id: '335232', updateRequest: 'Steel', date: '21/07/2024', previousQuantity: '10 Tons', updatedQuantity: '12 Tons' },
//     { id: '335233', updateRequest: 'Bricks', date: '22/07/2024', previousQuantity: '5000 Pieces', updatedQuantity: '6000 Pieces' },
//     { id: '335234', updateRequest: 'Sand', date: '23/07/2024', previousQuantity: '15 Cubic Meters', updatedQuantity: '20 Cubic Meters' },
//     { id: '335235', updateRequest: 'Gravel', date: '24/07/2024', previousQuantity: '7 Tons', updatedQuantity: '9 Tons' },
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.itemContainer}
//       onPress={() => {
//         setSelectedItem(item);
//         setModalVisible(true);
//       }}
//     >
//       <View style={styles.itemContent}>
//         <View style={styles.itemDetails}>
//           <Text style={styles.regId}>Reg.Id : # {item.id}</Text>
//           <Text style={styles.updateRequest}>
//             Update Request : {item.updateRequest}
//           </Text>
//         </View>
//         <Text style={styles.date}>Date : {item.date}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={inventoryItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <Pressable
//           style={styles.modalOverlay}
//           onPress={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContent}>
//             {selectedItem && (
//               <>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalRegId}>Reg.Id : # {selectedItem.id}</Text>
//                   <Text style={styles.modalDate}>Date : {selectedItem.date}</Text>
//                 </View>
//                 <Text style={styles.modalUpdateRequest}>Update Request : {selectedItem.updateRequest}</Text>
//                 <View style={styles.modalQuantityContainer}>
//                   <Text style={styles.modalQuantity}>Previous Quantity : {selectedItem.previousQuantity}</Text>
//                   <Text style={styles.modalQuantity}>Updated Quantity : {selectedItem.updatedQuantity}</Text>
//                 </View>
//                 <TouchableOpacity style={styles.approveButton} onPress={() => setModalVisible(false)}>
//                   <Text style={styles.approveButtonText}>Approve</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
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
//     shadowOpacity: 0.3,
//     shadowRadius: 9,
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
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 8,
//     elevation: 5,
//     width: '80%',
    
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
    
//   },
//   modalRegId: {
//     fontSize: 14,
//     color: 'rgba(99,99,104,1)',

//   },
//   modalDate: {
//     fontSize: 14,
//     color: 'rgba(99,99,104,1)',
//   },
//   modalUpdateRequest: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: 'rgba(99,99,104,1)',
//   },
//   modalQuantityContainer: {
//     marginBottom: 20,
//   },
//   modalQuantity: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: 'rgba(99,99,104,1)',
//   },
//   approveButton: {
//     backgroundColor: '#FF9500',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   approveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default PendingInventory;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, Pressable, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/url';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PendingInventory = ({ projectId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchInventoryItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/uploaded-inventory?projectId=${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const { reducedInventories, uploadedInventories } = response.data;

      const formattedItems = [
        ...reducedInventories.map(item => ({
          ...item,
          type: 'reduce',
          timestamp: new Date(item.createdAt).getTime(),
          date: formatDate(item.createdAt),
        })),
        ...uploadedInventories.map(item => ({
          ...item,
          type: 'update',
          timestamp: new Date(item.createdAt).getTime(),
          date: formatDate(item.createdAt),
        })),
      ];

      const sortedItems = formattedItems.sort((a, b) => b.timestamp - a.timestamp);
      setInventoryItems(sortedItems);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  };

  const deleteInventoryItem = async () => {
    if (!selectedItem) return;
    try {
      const token = await AsyncStorage.getItem('token');
      let url = '';
  
      if (selectedItem.type === 'reduce') {
        url = `${API_URL}/inventory/reduced-inventory?reducedInventoryId=${selectedItem._id}`;
      } else if (selectedItem.type === 'update') {
        url = `${API_URL}/inventory/uploaded-inventory?uploadInventoryId=${selectedItem._id}`;
      }
  
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      fetchInventoryItems();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };
  

  const approveRequest = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      let url = '';
      let payload = {};

      if (selectedItem.type === 'update') {
        url = `${API_URL}/inventory/confirm`;
        payload = {
          projectId: projectId,
          uploadInventoryId: requestId,
          materials: selectedItem.requestedItems.map(item => ({
            itemName: item.itemName,
            quantity: item.quantity,
            units: item.units,
          })),
        };
      } else if (selectedItem.type === 'reduce') {
        url = `${API_URL}/inventory/approve`;
        payload = {
          projectId: projectId,
          reducedInventoryId: requestId,
          materials: selectedItem.items.map(item => ({
            itemName: item.itemName,
            quantity: item.quantity,
            units: item.units,
          })),
        };
      }

      await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      fetchInventoryItems();
      setModalVisible(false);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.itemDetails}>
          <Text style={styles.regId}>Reg.Id : #{item._id.slice(0, 4)}</Text>
          <Text style={styles.updateRequest}>
            {item.type === 'update' ? 'Update' : 'Reduce'} Request: {formatItems(item)}
          </Text>
        </View>
        <Text style={styles.date}>Date: {item.date}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => {
          setSelectedItem(item);
          setDeleteModalVisible(true);
        }}
      >
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const formatItems = (item) => {
    const itemsArray = item.type === 'update' ? item.requestedItems : item.items;
    return itemsArray.map(i => `${i.itemName} (${i.quantity} ${i.units})`).join(', ');
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={inventoryItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Approval Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalRegId}>Reg.Id : #{selectedItem._id.slice(0, 4)}</Text>
                  <Text style={styles.modalDate}>{selectedItem.date}</Text>
                </View>
                <Text style={styles.modalUpdateRequest}>
                  {selectedItem.type === 'update' ? 'Update' : 'Reduce'} Request
                </Text>
                <View style={styles.modalItemsContainer}>
                  {(selectedItem.type === 'update' ? selectedItem.requestedItems : selectedItem.items).map((item, index) => (
                    <View key={index} style={styles.modalItem}>
                      <Text style={styles.modalItemName}>{item.itemName}</Text>
                      <Text style={styles.modalQuantity}>
                        Quantity: {item.quantity} {item.units}
                      </Text>
                    </View>
                  ))}
                </View>
                {selectedItem.type === 'update' && selectedItem.media && selectedItem.media.length > 0 && (
                  <View style={styles.imageContainer}>
                    {selectedItem.media.map((media, index) => (
                      <Image
                        key={index}
                        source={{ uri: media.compressedUrl }}
                        style={styles.image}
                      />
                    ))}
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.approveButton} 
                  onPress={() => approveRequest(selectedItem._id)}
                >
                  <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDeleteModalVisible(false)}
        >
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalText}>Are you sure you want to delete this item?</Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity 
                style={[styles.deleteModalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.deleteModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.deleteModalButton, styles.confirmButton]}
                onPress={deleteInventoryItem}
              >
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
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
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
    fontFamily: "Prompt-Medium",
    fontWeight: '400',
    marginBottom: 4,
  },
  updateRequest: {
    color: 'rgba(36,36,36,1)',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Prompt-Medium",
  },
  date: {
    color: 'rgba(99,99,104,1)',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Prompt-Medium",
    textAlign: 'right',
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalRegId: {
    fontSize: 14,
    color: 'rgba(99,99,104,1)',
    fontFamily: "Prompt-Medium",
  },
  modalDate: {
    fontSize: 14,
    color: 'rgba(99,99,104,1)',
    fontFamily: "Prompt-Medium",
  },
  modalUpdateRequest: {
    fontSize: 18,
    fontFamily: "Prompt-Medium",
    marginBottom: 15,
    color: 'rgba(99,99,104,1)',
  },
  modalQuantityContainer: {
    marginBottom: 20,
  },
  modalQuantity: {
    fontSize: 16,
    marginBottom: 5,
    color: 'rgba(99,99,104,1)',
    fontFamily: "Prompt-Medium",
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  approveButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "Prompt-Medium",

  },
  modalItemsContainer: {
    marginBottom: 20,
  },
  modalItem: {
    marginBottom: 10,
  },
  modalItemName: {
    fontSize: 16,
    fontFamily: "Prompt-Medium",
    color: 'rgba(99,99,104,1)',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 5,
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
    fontFamily: "Prompt-Medium",
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
    fontFamily: "Prompt-Medium",
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
    fontFamily: "Prompt-Medium",
    color: 'rgba(99,99,104,1)',
    marginBottom: 4,
  },
  modalQuantity: {
    fontSize: 14,
    color: 'rgba(99,99,104,1)',
    fontFamily: "Prompt-Medium",
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
  approveButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "Prompt-Medium",
  },
});

export default PendingInventory;