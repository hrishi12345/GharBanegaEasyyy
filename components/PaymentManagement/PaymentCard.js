// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const PaymentCard = () => {
//   const projectData = {
//     id: "1",
//     projectName: "Office Building Construction",
//     date: "22/07/2024",
//     siteName: "Downtown Plaza",
//     amount: 5000,
//   };

//   return (
//     <View style={styles.projectCard}>
//       <View style={styles.projectContent}>
//         <View style={styles.headerRow}>
//           <Text style={styles.projectName}>{projectData.projectName}</Text>
//           <Text style={styles.dateText}>Date: {projectData.date}</Text>
//         </View>
        
//         <View style={styles.infoRow}>
//           <Text style={styles.siteText}>Site Name: {projectData.siteName}</Text>
//           <Text style={styles.amountText}>Amount: ₹{projectData.amount}</Text>
//         </View>
        
//         <View style={styles.approveButton}>
//           <Text style={styles.approveButtonText}>Approve</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   projectCard: {
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "rgba(236,236,236,1)",
//     backgroundColor: "rgba(254,254,254,1)",
//     overflow: "hidden",
//   },
//   projectContent: {
//     padding: 12,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   projectName: {
//     color: "rgba(2,119,211,1)",
//     fontSize: 14,
//     fontFamily: "Prompt, sans-serif",
//     fontWeight: "500",
//   },
//   dateText: {
//     color: "rgba(143,143,143,1)",
//     fontSize: 10,
//     fontFamily: "Prompt, sans-serif",
//     fontWeight: "300",
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   siteText: {
//     color: "rgba(51,51,51,1)",
//     fontSize: 12,
//     fontFamily: "Prompt, sans-serif",
//     fontWeight: "500",
//   },
//   amountText: {
//     color: "rgba(51,51,51,1)",
//     fontSize: 12,
//     fontFamily: "Prompt, sans-serif",
//     fontWeight: "500",
//   },
//   approveButton: {
//     backgroundColor: "rgba(2,119,211,1)",
//     borderRadius: 8,
//     padding: 12,
//     alignItems: "center",
//   },
//   approveButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontFamily: "Prompt, sans-serif",
//     fontWeight: "500",
//   },
// });

// export default PaymentCard;
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PaymentStatusCard from './PaymentStatusCard';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const PaymentManagementCard = ({ invoices = [] }) => {
  console.log('Received invoices:', invoices);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>Payment Management</Text>
        <Text style={styles.viewDetailsLink}>View details</Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.cardContent}
      >
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <PaymentStatusCard
             invoice={invoice}
            />
          ))
        ) : (
          <Text style={styles.noInvoicesText}>No invoices available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveHeight(35),
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#F1F1F1',
  },
  headerTitle: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  viewDetailsLink: {
    color: '#0277D3',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  cardContent: {
    flex: 1,
    padding: 5,
  },
  noInvoicesText: {
    color: '#8F8F8F',
    fontSize: 14,
    fontFamily: 'Prompt-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentManagementCard;
