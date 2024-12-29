// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import FileText from '../../assests/FileText';

// const { width } = Dimensions.get('window');

// const PaymentStatusCard = () => {
//   const invoice = {
//     id: '235463D',
//     date: '24/08/2024',
//     amount: '₹4,50,000',
//     status: 'Pending',
//     projectName: 'Project Name'
//   };

//   return (
//     <View style={styles.invoiceItem}>
//       <View style={styles.invoiceDetails}>
//         {/* Header Row */}
//         <View style={styles.headerRow}>
//           <Text style={styles.projectName}>{invoice.projectName}</Text>
//           <TouchableOpacity style={styles.invoiceIcon}>
//             <FileText />
//           </TouchableOpacity>
//         </View>

//         {/* Invoice ID Row */}
//         <View style={styles.infoRow}>
//           <Text style={styles.invoiceId}>Invoice ID : </Text>
//           <Text style={styles.invoiceIdText}>{invoice.id}</Text>
//         </View>

//         {/* Dates Row */}
//         <View style={styles.dateRow}>
//           <View style={styles.dateInfo}>
//             <Text style={styles.invoiceId}>Invoice Date :</Text>
//             <Text style={styles.invoiceIdText}>{invoice.date}</Text>
//           </View>
//           <View style={styles.dateInfo}>
//             <Text style={styles.invoiceId}>Due Date : </Text>
//             <Text style={styles.invoiceIdText}>{invoice.date}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Amount Row */}
//       <View style={styles.amountRow}>
//         <Text style={styles.invoiceId}>Total Due Amount: </Text>
//         <Text style={styles.amountIdText}>{invoice.amount}</Text>
//       </View>

//       {/* Status Row */}
//       <View style={styles.invoiceActions}>
//         <Text
//           style={[
//             styles.invoiceStatus,
//             {color: invoice.status === 'Paid' ? 'green' : 'red'},
//           ]}>
//           Status : {invoice.status}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   invoiceItem: {
//     backgroundColor: 'white',
//     margin: 16,
//     marginBottom: 0,
//     padding: 16,
//     borderRadius: 8,
//     borderWidth: 0.7,
//     width: width - 32, // Responsive width
//   },
//   invoiceDetails: {
//     marginBottom: 8,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   projectName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: 'black',
//   },
//   invoiceIcon: {
//     padding: 8,
//     backgroundColor: '#FFF0E6',
//     borderRadius: 20,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     marginBottom: 4,
//   },
//   dateRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     gap: 20,
//   },
//   dateInfo: {
//     flexDirection: 'row',
//   },
//   invoiceId: {
//     fontSize: 14,
//     color: 'black',
//     fontWeight: '500',
//   },
//   invoiceIdText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   amountRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   amountIdText: {
//     fontSize: 14,
//     color: '#0277D3',
//   },
//   invoiceActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 8,
//   },
//   invoiceStatus: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default PaymentStatusCard;
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import InvoiceIcon2 from '../../assests/InvoiceIcon2';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');

const PaymentStatusCard = ({ invoice }) => {
  const handlePayNow = async () => {
    try {
      // Create order and get Razorpay payment URL from backend
      const response = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: invoice.amount }),
      });
  
      if (response.ok) {
        const { orderId, paymentUrl } = await response.json();
  
        if (paymentUrl) {
          // Redirect user to Razorpay payment page
          Alert.alert(
            'Redirecting to Payment',
            'You will now be redirected to the payment page.',
            [
              {
                text: 'Proceed',
                onPress: () => {
                  // Open payment URL
                  Linking.openURL(paymentUrl);
                },
              },
            ]
          );
        } else {
          Alert.alert('Error', 'Unable to redirect to payment page. Please try again.');
        }
      } else {
        Alert.alert('Payment Failed', 'Unable to initiate payment. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to process payment at the moment.');
      console.error('Payment error:', error);
    }
  };
  

  return (
    <View key={invoice._id} style={styles.invoiceItem}>
      <View style={styles.invoiceDetails}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.projectName}>Project Name</Text>
          <TouchableOpacity style={styles.invoiceIcon}>
            <InvoiceIcon2 />
          </TouchableOpacity>
        </View>

        {/* Invoice ID Row */}
        <View style={styles.infoRow}>
          <Text style={styles.invoiceId}>Invoice ID: </Text>
          <Text style={styles.invoiceIdText}>{invoice._id}</Text>
        </View>

        {/* Dates Row */}
        <View style={styles.dateRow}>
          <View style={styles.dateInfo}>
            <Text style={styles.invoiceId}>Invoice Date: </Text>
            <Text style={styles.invoiceIdText}>
              {new Date(invoice.date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.invoiceId}>Due Date: </Text>
            <Text style={styles.invoiceIdText}>
              {new Date(invoice.dueDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Amount Row */}
      <View style={styles.amountRow}>
        <Text style={styles.invoiceId}>Total Due Amount: </Text>
        <Text style={styles.amountIdText}>₹{invoice.amount}</Text>
      </View>

      {/* Status Row */}
      <View style={styles.invoiceActions}>
        <Text
          style={[
            styles.invoiceStatus,
            { color: invoice.status === 'Paid' ? 'green' : 'red' },
          ]}
        >
          Status: {invoice.status}
        </Text>
        {invoice.status !== 'Paid' && (
          <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceItem: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 8,
    borderWidth: 0.7,
    width: '80%',
  },
  invoiceDetails: {
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    color: 'black',
  },
  invoiceIcon: {
    padding: 8,
    backgroundColor: '#0277D3',
    borderRadius: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateInfo: {
    flexDirection: 'row',
  },
  invoiceId: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Prompt-Medium',
  },
  invoiceIdText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Prompt-Medium',
  },
  amountRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  amountIdText: {
    fontSize: 14,
    color: '#0277D3',
    fontFamily: 'Prompt-Medium',
  },
  invoiceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  invoiceStatus: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  payNowButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0277D3',
    borderRadius: 4,
  },
  payNowButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
});

export default PaymentStatusCard;
