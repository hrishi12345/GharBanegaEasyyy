// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   TextInput,
//   TouchableWithoutFeedback,
// } from 'react-native';

// import BackIcon from '../assests/BackIcon';
// import FileText from '../assests/FileText';
// import CalenderIcon from '../assests/CalenderIcon';
// import {useNavigation} from '@react-navigation/native';

// const SuperVisorPaymentManagementScreen = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [invoiceDate, setInvoiceDate] = useState('24/05/2024');
//   const [dueDate, setDueDate] = useState('');
//   const navigation = useNavigation();

//   const invoices = [
//     {id: '235463D', date: '24/08/2024', amount: '₹4,50,000', status: 'Paid'},
//     {id: '235463D', date: '24/08/2024', amount: '₹4,50,000', status: 'Pending'},
//     {id: '235463D', date: '24/08/2024', amount: '₹4,50,000', status: 'Pending'},
//     {id: '235463D', date: '24/08/2024', amount: '₹4,50,000', status: 'Pending'},
//   ];
//   const handleCreateInvoice = () => {
//     console.log('Opening modal'); // Debug log
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     console.log('Closing modal'); // Debug log
//     setIsModalVisible(false);
//   };
//   const CreateInvoiceModal = () => (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={isModalVisible}
//       onRequestClose={() => setIsModalVisible(false)}>
//       <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <TouchableWithoutFeedback onPress={() => {}}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Create Invoice</Text>

//               <Text style={styles.inputLabel}>Particulars</Text>
//               <TextInput style={styles.input} placeholder="Text" />

//               <View style={styles.dateContainer}>
//                 <View style={styles.dateField}>
//                   <Text style={styles.inputLabel}>Invoice Date</Text>
//                   <View style={styles.dateInput}>
//                     <Text>{invoiceDate}</Text>
//                     <CalenderIcon color="#FF6600" size={20} />
//                   </View>
//                 </View>
//                 <View style={styles.dateField}>
//                   <Text style={styles.inputLabel}>Due Date</Text>
//                   <View style={styles.dateInput}>
//                     <Text>{dueDate || 'Select date'}</Text>
//                     <CalenderIcon color="#FF6600" size={20} />
//                   </View>
//                 </View>
//               </View>

//               <Text style={styles.inputLabel}>Invoice Amount (Incl. GST)</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Numeric text"
//                 keyboardType="numeric"
//               />

//               <TouchableOpacity style={styles.uploadButton}>
//                 <Text style={styles.uploadButtonText}>Upload PDF</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.sendButton}
//                 onPress={() => setIsModalVisible(false)}>
//                 <Text style={styles.sendButtonText}>Send Invoice</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.container2}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.mainHeader}>Payment Management</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.createInvoiceButton}
//         onPress={() => setIsModalVisible(true)}>
//         <Text style={styles.createInvoiceText}>Create Invoice</Text>
//       </TouchableOpacity>

//       <ScrollView style={styles.invoiceList}>
//         {invoices.map((invoice, index) => (
//           <View key={index} style={styles.invoiceItem}>
//             <View style={styles.invoiceDetails}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}>
//                 <Text style={styles.projectName}>Project Name</Text>
//                 <TouchableOpacity style={styles.invoiceIcon}>
//                   <FileText />
//                 </TouchableOpacity>
//               </View>

//               <View style={{flexDirection: 'row'}}>
//                 <Text style={styles.invoiceId}>Invoice ID : </Text>
//                 <Text style={styles.invoiceIdText}>{invoice.id}</Text>
//               </View>
//               <View style={{flexDirection: 'row'}}>
//                 <View style={{flexDirection: 'row'}}>
//                   <Text style={styles.invoiceId}>Invoice Date :</Text>
//                   <Text style={styles.invoiceIdText}>{invoice.date} </Text>
//                 </View>
//                 <View style={{flexDirection: 'row'}}>
//                   <Text style={styles.invoiceId}>Due Date : </Text>
//                   <Text style={styles.invoiceIdText}>{invoice.date}</Text>
//                 </View>
//               </View>
//             </View>
//             <View style={{flexDirection: 'row'}}>
//               <Text style={styles.invoiceId}>Total Due Amount: </Text>
//               <Text style={styles.amountIdText}>{invoice.amount}</Text>
//             </View>
//             <View style={styles.invoiceActions}>
//               <Text
//                 style={[
//                   styles.invoiceStatus,
//                   {color: invoice.status === 'Paid' ? 'green' : 'red'},
//                 ]}>
//                 Status : {invoice.status}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <CreateInvoiceModal
//         isVisible={isModalVisible}
//         onClose={handleCloseModal}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   headerTitle: {
//     marginLeft: 16,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   createInvoiceButton: {
//     backgroundColor: '#333333',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   createInvoiceText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   invoiceList: {
//     flex: 1,
//   },
//   invoiceItem: {
//     backgroundColor: 'white',
//     margin: 16,
//     marginBottom: 0,
//     padding: 16,
//     borderRadius: 8,
//     borderWidth: 0.7,
//   },
//   invoiceDetails: {
//     marginBottom: 8,
//   },
//   projectName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: 'black',
//     marginBottom: 8,
//   },
//   invoiceId: {

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../assests/BackIcon';
import FileText from '../assests/FileText';
import CalenderIcon from '../assests/CalenderIcon';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../utils/url';
import InvoiceIcon2 from '../assests/InvoiceIcon2';
import DatePicker from 'react-native-date-picker';

import DocumentPicker from 'react-native-document-picker';

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const SuperVisorPaymentManagementScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState('24/05/2024');
  const [dueDate, setDueDate] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [file, setFile] = useState(null);
  const [isDueDatePickerVisible, setDueDatePickerVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'Token not found');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/invoice/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }

        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);
  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleCreateInvoice = () => {
    setIsModalVisible(true);
  };
  const handleDateChange = (date) => {
    setInvoiceDate(date.toISOString().split('T')[0]);
    console.log('sdasdas',invoiceDate)
    setDatePickerVisible(false);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date.toISOString().split('T')[0]);
    setDueDatePickerVisible(false);
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      if (result) {
        setFile(result);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Failed to upload file');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleDownloadMedia = (url) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert('Error', 'Failed to open URL')
    );
  };
  const handleSendInvoice = async () => {
    try {
      if (!file || !dueDate || !invoiceAmount) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
      formData.append('dueDate', dueDate);
      formData.append('date', invoiceDate);
      formData.append('amount', invoiceAmount);

      const response = await fetch(`${API_URL}/invoice/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send invoice');
      }

      Alert.alert('Success', 'Invoice sent successfully');
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const parseDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date;
    } catch (error) {
      console.error('Error parsing date:', error);
      return new Date(); // Return current date as fallback
    }
  };
  const CreateInvoiceModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create Invoice</Text>

              <Text style={styles.inputLabel}>Particulars</Text>
              <TextInput style={styles.input} placeholder="Text" />

              <View style={styles.dateContainer}>
                <View style={styles.dateField}  >
                  <Text style={styles.inputLabel}>Invoice Date</Text>
                  <TouchableOpacity
                  onPress={() => setDatePickerVisible(true)}
                  style={styles.dateInput
                  
                  }>
                    
                  <Text>{invoiceDate}</Text>
                  <CalenderIcon color="#FF6600" size={20} />
                </TouchableOpacity>
                </View>
                <View style={styles.dateField}>
                <Text style={styles.inputLabel}>Due Date</Text>
                <TouchableOpacity
                  onPress={() => setDueDatePickerVisible(true)}
                  style={styles.dateInput}>
                  <Text>{dueDate || 'Select date'}</Text>
                  <CalenderIcon color="#FF6600" size={20} />
                </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.inputLabel}>Invoice Amount (Incl. GST)</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={invoiceAmount}
                  onChangeText={setInvoiceAmount}
                />


<TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
                  <Text style={styles.uploadButtonText}>Upload PDF/Photo</Text>
                </TouchableOpacity>

              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.sendButtonText}>Send Invoice</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <>
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Payment Management</Text>
      </View>

      <TouchableOpacity
        style={styles.createInvoiceButton}
        onPress={handleCreateInvoice}>
        <Text style={styles.createInvoiceText}>Create Invoice</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.invoiceList}>
          {invoices.map((invoice) => (
            <View key={invoice._id} style={styles.invoiceItem}>
              <View style={styles.invoiceDetails}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.projectName}>Project Name</Text>
                  <TouchableOpacity style={styles.invoiceIcon}>
                    <InvoiceIcon2 />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.invoiceId}>Invoice ID : </Text>
                  <Text style={styles.invoiceIdText}>{invoice._id}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.invoiceId}>Invoice Date :</Text>
                    <Text style={styles.invoiceIdText}>{new Date(invoice.date).toLocaleDateString()}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.invoiceId}>Due Date : </Text>
                    <Text style={styles.invoiceIdText}>{new Date(invoice.dueDate).toLocaleDateString()}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.invoiceId}>Total Due Amount: </Text>
                <Text style={styles.amountIdText}>₹{invoice.amount}</Text>
              </View>
              <View style={styles.invoiceActions}>
                <Text
                  style={[
                    styles.invoiceStatus,
                    { color: invoice.status === 'Paid' ? 'green' : 'red' },
                  ]}>
                  Status : {invoice.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <CreateInvoiceModal />
    </View>
    <DatePicker
  modal
  open={isDatePickerVisible}
  date={parseDate(invoiceDate)}
  onConfirm={handleDateChange}
  onCancel={() => setDatePickerVisible(false)}
/>
          </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: "Prompt-Medium",
  },
  createInvoiceButton: {
    backgroundColor: '#333333',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createInvoiceText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "Prompt-Medium",
  },
  invoiceList: {
    flex: 1,
  },
  invoiceItem: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 8,
    borderWidth: 0.7,
  },
  invoiceDetails: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 14,
    fontFamily: "Prompt-Medium",
    color: 'black',
    marginBottom: 8,
  },
  invoiceId: {
   

    fontSize: 14,
    color: 'black',
    marginBottom: 4,
    fontFamily: "Prompt-Medium",
  },
  invoiceIdText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: "Prompt-Medium",
  },
  invoiceDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: "Prompt-Medium",
  },
  invoiceAmount: {
    fontSize: 14,
    fontFamily: "Prompt-Medium",
  },
  invoiceActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    marginTop: 8,
  },
  invoiceIcon: {
    padding: 8,
    backgroundColor: '#0277D3',
    borderRadius: 20,
  },
  invoiceStatus: {
    fontSize: 14,
    fontFamily: "Prompt-Medium",
  },
  amountIdText: {
    fontSize: 14,
    color: '#0277D3',
    marginBottom: 4,
    fontFamily: "Prompt-Medium",
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: "Prompt-Medium",
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Prompt-Medium",
    marginBottom: 20,
    color: '#0277D3',
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
    fontFamily: "Prompt-Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateField: {
    width: '48%',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  uploadButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  uploadButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontFamily: "Prompt-Medium",
  },
});

export default SuperVisorPaymentManagementScreen;
