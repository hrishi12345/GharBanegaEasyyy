// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { API_URL } from "../../utils/url";
// import { useSelector } from "react-redux";

// const RationRequest = () => {
//   const [projectData, setProjectData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const homeData = useSelector((state) => state.projects.projects);

//   const projectNames = homeData.map(project => project.projectName);
//   console.log("projectNames", projectNames);
//   useEffect(() => {
//     const fetchRationData = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (!token) {
//           Alert.alert("Error", "Token not found");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${API_URL}/ration`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("ration data ", response.data);
//         setProjectData(response.data); // Assuming the API returns an array of projects
//       } catch (error) {
//         console.error("Error fetching ration data:", error);
//         Alert.alert("Error", "Failed to fetch data from the server.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRationData();
//   }, []);

//   const renderProjectCard = ({ item }) => (
//     <View style={styles.projectCard}>
//       <View style={styles.projectContent}>
//         <View style={styles.headerRow}>
//           <Text style={styles.projectName}>{item.projectName}</Text>
//           <Text style={styles.dateText}>Date: {item.date}</Text>
//         </View>

//         <View style={styles.infoRow}>
//           <Text style={styles.siteText}>Site Name: {item.siteName}</Text>
//           <Text style={styles.amountText}>Amount: ₹{item.amount}</Text>
//         </View>

//         <View style={styles.approveButton}>
//           <Text style={styles.approveButtonText}>Approve</Text>
//         </View>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0277D3" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {projectData.length > 0 ? (
//         <FlatList
//           data={projectData}
//           renderItem={renderProjectCard}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>No data available</Text>
//         </View>
//       )}
//     </View>
//   );
// };
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../utils/url';
import { useSelector } from 'react-redux';

const RationRequest = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
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
  };

  const formatDate = isoDate => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
  };

  const submitRation = async () => {
    if (!selectedProject || !amount) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/ration`,
        { projectId: selectedProject, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Ration added successfully!');
      closeModal();
      fetchRationData();
    } catch (error) {
      console.error('Error submitting ration:', error);
      Alert.alert('Error', 'Failed to add ration.');
    }
  };

  const fetchRationData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/ration`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Sort data by creation date in descending order
      const sortedData = response.data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setProjectData(sortedData || []);
    } catch (error) {
      console.error('Error fetching ration data:', error);
      Alert.alert('Error', 'Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };
  

  const approveRation = async (rationId) => {
    Alert.alert(
      'Approve Ration',
      'Are you sure you want to approve this ration?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            try {
              await axios.patch(
                `${API_URL}/ration`,
                { rationId, status: 'Approved' },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              Alert.alert('Success', 'Ration approved successfully!');
              fetchRationData();
            } catch (error) {
              console.error('Error approving ration:', error);
              Alert.alert('Error', 'Failed to approve ration.');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchRationData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>Add Ration</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0277D3" />
        </View>
      ) : projectData.length > 0 ? (
        <FlatList
          data={projectData}
          renderItem={({ item }) => (
            <View style={styles.projectCard}>
              <View style={styles.heading}>
                <Text style={styles.projectName}>{item.project.projectName}</Text>
                <Text style={styles.dateText}>Created At: {formatDate(item.createdAt)}</Text>
              </View>
              <View style={styles.heading}>
                <Text style={styles.projectName}>{item.project.projectCity}</Text>
                <Text style={styles.amountText}>Amount: ₹{item.amount}</Text>
              </View>
              <Text style={styles.statusText}>Status: {item.status}</Text>
              {userRole === 'Admin' && item.status !== 'Approved' && (
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => approveRation(item._id)}
                >
                  <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No data available</Text>
        </View>
      )}

      <Modal visible={isModalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              style={styles.modalContent}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <Text style={styles.modalTitle}>Add Ration</Text>

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
                  <Text style={{ color: 'black', padding: 10 }}>{item.label}</Text>
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

              <TouchableOpacity style={styles.saveButton} onPress={submitRation}>
                <Text style={styles.saveButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({  container: {
  
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    padding: 5,
    gap: 12,
  },
  projectCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(236,236,236,1)",
    backgroundColor: "rgba(254,254,254,1)",
    overflow: "hidden",
    padding: 12,
    margin:4
  },
  projectContent: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  projectName: {
    color: "rgba(2,119,211,1)",
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  dateText: {
    color: "grey",
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  siteText: {
    color: "rgba(51,51,51,1)",
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
  },
  amountText: {
    color: "rgba(51,51,51,1)",
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  approveButton: {
    backgroundColor: "rgba(2,119,211,1)",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  approveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(143,143,143,1)",
  },
addButton: {
  backgroundColor: '#0277D3',
  padding: 12,
  borderRadius: 8,
  margin: 10,
  alignItems: 'center',
},
addButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontFamily: 'Prompt-Medium',
},
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
  borderWidth: 0.5, // Black border for dropdown
  borderColor: 'black',
  borderRadius: 5,
  height: 50,
},
input: {
  width: '100%',
  height: 50,
  borderWidth: 0.5,
  borderRadius: 8,
  marginBottom: 20,
  paddingHorizontal: 10,
  fontFamily: 'Prompt-Medium',
  color: 'black',
},
saveButton: {
  backgroundColor: '#0277D3',
  padding: 12,
  borderRadius: 8,
  width: '100%',
  alignItems: 'center',
  marginBottom: 10,
},
saveButtonText: {
  color: '#FFF',
  fontSize: 16,
  fontFamily: 'Prompt-Medium',
},
cancelButton: {
  backgroundColor: 'gray',
  padding: 12,
  borderRadius: 8,
  width: '100%',
  alignItems: 'center',
},
cancelButtonText: {
  color: '#FFF',
  fontSize: 16,
  fontFamily: 'Prompt-Medium',
},
statusText: {
  color: "black",
  fontSize: 14,
  fontFamily: 'Prompt-Medium',
  
},
heading:{
  justifyContent:'space-between',
  flexDirection:'row',
  marginVertical:5
},
modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },},
);

export default RationRequest;
