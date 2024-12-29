// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import MainLayout from '../../components/Tabs/MainLayout';
// import {useNavigation} from '@react-navigation/native';

// // Dummy project data
// const dummyProjectData = {
//   _id: '1',
//   projectName: 'Metro City Development',
//   projectCity: 'Mumbai Central',
//   status: 'In Progress',
//   totalBudget: '₹50,00,000',
//   startDate: '2024-01-15',
//   completionDate: '2024-12-31',
// };

// // Additional dummy inventory data if needed
// const dummyInventory = [
//   {
//     id: '1',
//     project: '1',
//     itemName: 'Steel Reinforcement',
//     quantity: '500 tons',
//     status: 'Delivered',
//   },
//   {
//     id: '2',
//     project: '1',
//     itemName: 'Cement Bags',
//     quantity: '1000 bags',
//     status: 'Pending',
//   },
// ];

// export default function EarlyPayRequest() {
//   const navigation = useNavigation();

//   return (
//     <ScrollView style={styles.projectList}>
//       <View style={styles.projectItem}>
//         <Text style={styles.projectName}>{dummyProjectData.projectName}</Text>
//         <View style={styles.siteRow}>
//           <Text style={styles.siteName}>{dummyProjectData.projectCity}</Text>
//           <TouchableOpacity
//             style={styles.viewProgressContainer}
//             onPress={() =>
//               navigation.navigate('InventoryManagement', {
//                 projectData: dummyProjectData,
//               })
//             }>
//             <Text style={styles.viewProgressText}>View Details</Text>
//             <View style={styles.underline} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.borderBottom} />
//       </View>

//       {/* Additional project items for demonstration */}
//       <View style={styles.projectItem}>
//         <Text style={styles.projectName}>Riverside Apartments</Text>
//         <View style={styles.siteRow}>
//           <Text style={styles.siteName}>Thane West</Text>
//           <TouchableOpacity
//             style={styles.viewProgressContainer}
//             onPress={() =>
//               navigation.navigate('InventoryManagement', {
//                 projectData: {
//                   ...dummyProjectData,
//                   projectName: 'Riverside Apartments',
//                   projectCity: 'Thane West',
//                 },
//               })
//             }>
//             <Text style={styles.viewProgressText}>View Details</Text>
//             <View style={styles.underline} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.borderBottom} />
//       </View>

//       <View style={styles.projectItem}>
//         <Text style={styles.projectName}>Green Valley Township</Text>
//         <View style={styles.siteRow}>
//           <Text style={styles.siteName}>Pune East</Text>
//           <TouchableOpacity
//             style={styles.viewProgressContainer}
//             onPress={() =>
//               navigation.navigate('InventoryManagement', {
//                 projectData: {
//                   ...dummyProjectData,
//                   projectName: 'Green Valley Township',
//                   projectCity: 'Pune East',
//                 },
//               })
//             }>
//             <Text style={styles.viewProgressText}>View Details</Text>
//             <View style={styles.underline} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.borderBottom} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFEFE',
//     paddingTop: 44, // Accounting for status bar
//   },
//   container2: {
//     margin: 20,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#333333',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   projectList: {
//     flex: 1,
//   },
//   projectItem: {
//     paddingHorizontal: 26,
//     paddingVertical: 12,
//   },
//   projectName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#0277D3',
//     marginBottom: 4,
//   },
//   siteRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   siteName: {
//     fontSize: 12,
//     color: '#333333',
//   },
//   viewProgressContainer: {
//     alignItems: 'flex-end',
//   },
//   viewProgressText: {
//     fontSize: 12,
//     color: '#0277D3',
//   },
//   underline: {
//     height: 1,
//     backgroundColor: '#0277D3',
//     width: '100%',
//     marginTop: 2,
//   },
//   borderBottom: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginTop: 12,
//     marginLeft: -10,
//     marginRight: 0,
//   },
// });
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../utils/url';
import { useSelector } from 'react-redux';

const EarlyPayRequest = () => {
  const [earlyPayData, setEarlyPayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [forWhom, setForWhom] = useState('');
  const userRole = useSelector((state) => state.auth.user?.userType);

  const homeData = useSelector(state => state.projects.projects);
  const projectNames = homeData.map(project => ({
    label: project.projectName,
    value: project._id,
  }));

  const toggleModal = () => setModalVisible(!isModalVisible);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProject(null);
    setAmount('');
    setForWhom('');
  };

  const submitEarlyPay = async () => {
    if (!selectedProject || !amount || !forWhom) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/earlyPay`,
        { projectId: selectedProject, amount, forWhom },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', 'Early Pay added successfully!');
      closeModal();
      fetchEarlyPayData();
    } catch (error) {
      console.error('Error submitting Early Pay:', error);
      Alert.alert('Error', 'Failed to add Early Pay.');
    }
  };

  const approveEarlyPay = async (earlyPayId) => {
    Alert.alert(
      'Confirm Approval',
      'Are you sure you want to approve this Early Pay request?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            try {
              await axios.patch(
                `${API_URL}/earlyPay`,
                { earlyPayId, status: 'Approved' },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              Alert.alert('Success', 'Early Pay approved successfully!');
              fetchEarlyPayData();
            } catch (error) {
              console.error('Error approving Early Pay:', error);
              Alert.alert('Error', 'Failed to approve Early Pay.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  const fetchEarlyPayData = async () => {
    setLoading(true); // Start loading state
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token not found');
        setLoading(false);
        return;
      }
  
      const response = await axios.get(`${API_URL}/earlyPay`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Sort data by creation date in descending order
      const sortedData = response.data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setEarlyPayData(sortedData || []);
    } catch (error) {
      console.error('Error fetching Early Pay data:', error);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setLoading(false); // End loading state
    }
  };
  

  useEffect(() => {
    fetchEarlyPayData();
  }, []);

  const formatDate = isoDate => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>Add Early Pay</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0277D3" />
        </View>
      ) : earlyPayData.length > 0 ? (
        <FlatList
          data={earlyPayData}
          renderItem={({ item }) => (
            <View style={styles.earlyPayCard}>
              <View style={styles.heading}>
                <Text style={styles.projectName}>{item.project.projectName}</Text>
                <Text style={styles.dateText}>Created At: {formatDate(item.createdAt)}</Text>
              </View>
              <View style={styles.heading}>
                <Text style={styles.projectCity}>{item.project.projectCity}</Text>
                <Text style={styles.statusText}>Status: {item.status}</Text>
              </View>
              <View style={styles.heading}>
                <Text style={styles.forWhomText}>Employee Name: {item.forWhom}</Text>
                <Text style={styles.amountText}>Amount: ₹{item.amount}</Text>
              </View>
              {userRole === 'Admin' && item.status !== 'Approved' && (
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => approveEarlyPay(item._id)}
                >
                  <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={item => item._id}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No Early Pay records available</Text>
        </View>
      )}

      <Modal visible={isModalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Early Pay</Text>

              <Dropdown
                style={styles.dropdown}
                data={projectNames}
                labelField="label"
                valueField="value"
                placeholder="Select Project"
                value={selectedProject}
                onChange={item => setSelectedProject(item.value)}
                placeholderStyle={{ color: 'grey' }}
                selectedTextStyle={{ color: 'black', paddingHorizontal: 10 }}
                renderItem={item => (
                  <Text style={{ color: 'black', padding: 10 }}>
                    {item.label}
                  </Text>
                )}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor="grey"
              />

              <TextInput
                style={styles.input}
                placeholder="For Whom"
                value={forWhom}
                onChangeText={setForWhom}
                placeholderTextColor="grey"
              />

              <TouchableOpacity style={styles.saveButton} onPress={submitEarlyPay}>
                <Text style={styles.saveButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  addButton: { backgroundColor: '#0277D3', padding: 12, borderRadius: 8, margin: 10, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 16,  fontFamily: 'Prompt-Medium', },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  requestCard: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 10 },
  projectName: { color: '#0277D3', fontSize: 16, fontFamily: 'Prompt-Medium', },
  projectCity:{color: 'black', fontSize: 14, fontFamily: 'Prompt-Medium', },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: '#FFF', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '500', marginBottom: 20 },
  dropdown: { width: '100%', marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 5, height: 50 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 5, marginBottom: 20, paddingHorizontal: 10,color:'black' },
  saveButton: { backgroundColor: '#0277D3', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontFamily: 'Prompt-Medium', },
  cancelButton: { backgroundColor: 'gray', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  cancelButtonText: { color: '#FFF', fontSize: 16, fontFamily: 'Prompt-Medium', },
  statusText: {
    color: "black",
    fontSize: 14,
    fontFamily: 'Prompt-Medium',

    
  },
  forWhomText: {
    color: "black",
    fontSize: 13,
    fontFamily: 'Prompt-Medium',
    
  },
  amountText: {
    color: "black",
    fontSize: 13,
    fontFamily: 'Prompt-Medium',
    
  },
  dateText: {
    color: "grey",
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    
  },
  earlyPayCard:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(236,236,236,1)",
    backgroundColor: "rgba(254,254,254,1)",
    overflow: "hidden",
    padding: 12,
    margin:4
  },
  heading:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginVertical:5
  },
  approveButton: {
    backgroundColor: '#0277D3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  approveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
});

export default EarlyPayRequest;
