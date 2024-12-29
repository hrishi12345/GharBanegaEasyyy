import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const InventoryManagementCard = ({inventory}) => {
  const navigation = useNavigation();
  const userRole = useSelector(state => state.auth.user?.userType);

  // Check if inventory is an array and has items with materials
  const hasInventory = Array.isArray(inventory) && inventory.length > 0;

  const renderItem = ({item}) => (
    <InventoryItem
      key={item._id}
      name={item.itemName}
      quantity={`${item.quantity} ${item.units}`}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerTitle}>Inventory Management</Text>
          {userRole === 'admin' || userRole === 'Admin' ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AdminInventoryTracker', {inventory})
              }>
              <Text style={styles.viewDetailsLink}>View details</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Inventory', {inventory})}>
              <Text style={styles.viewDetailsLink}>View details</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardContent}>
          {hasInventory ? (
            <FlatList
              data={inventory.flatMap(project => project.materials)}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={styles.row}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.flatListContainer}
            />
          ) : (
            <Text style={styles.noDataText}>No inventory data available</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const InventoryItem = ({name, quantity}) => (
  <View style={styles.inventoryItem}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemQuantity}>{quantity}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 15,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#333333',
    fontSize: 15,
    fontFamily: 'Prompt-Medium',
  },
  viewDetailsLink: {
    color: '#0277D3',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  cardContent: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inventoryItem: {
    width: '48%', 
    marginHorizontal: '1%',
    marginBottom: 15,
  },
  itemInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
  color: 'rgba(244,119,33,1)',
    fontSize: 12,
    fontFamily: 'Prompt-Regular',
    marginBottom: 2,
    textAlign: 'center',
  },
  itemQuantity: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'Prompt-SemiBold',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Prompt-Regular',
    paddingVertical: 20,
  },
});

export default InventoryManagementCard;
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function InventoryManagementCard() {
//   const navigation=useNavigation()
//   return (
//     <View style={styles.cardContainer}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Inventory Management</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
//             <Text style={styles.viewDetailsLink}>View details</Text>
//           </TouchableOpacity>
//       </View>
//       <View style={styles.content}>
//         <View style={styles.itemRow}>
//           <View style={styles.itemContainer}>
//             <Text style={styles.itemName}>Cement</Text>
//             <Text style={styles.itemQuantity}>20 Bag</Text>
//           </View>
//           <View style={styles.itemContainer}>
//             <Text style={styles.itemName}>Steel Bar</Text>
//             <Text style={styles.itemQuantity}>2 Load</Text>
//           </View>
//         </View>
//         <View style={styles.itemRow}>
//           <View style={styles.itemContainer}>
//             <Text style={styles.itemName}>M-Sand</Text>
//             <Text style={styles.itemQuantity}>20 Bag</Text>
//           </View>
//           <View style={styles.itemContainer}>
//             <Text style={styles.itemName}>Brick</Text>
//             <Text style={styles.itemQuantity}>200 Bricks</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cardContainer: {
//     width: "100%", // Set to 100% to make it responsive to different screen sizes
//     borderWidth: 1,
//     borderColor: "rgba(241,241,241,1)",
//     borderRadius: 10,
//     padding: 15, // Adjusted padding for a bit more spacing
//     backgroundColor: "rgba(255,255,255,1)",
//     marginVertical: 15, // Add vertical margin for spacing between cards
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10, // Adjusted for consistency
//   },
//   title: {
//     color: "rgba(51,51,51,1)",
//     fontSize: 16, // Slightly increased for better readability
//     fontFamily: "Prompt-Medium", // Ensure this font is available in your project
//   },
//   viewDetails: {
//     color: "rgba(244,119,33,1)",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium", // Ensure this font is available in your project
//     textDecorationLine: "underline",
//   },
//   content: {
//     flexDirection: "column",
//   },
//   itemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 5,
//   },
//   itemContainer: {
//     width: "48%", // Adjusted for better distribution
//     padding: 5,
//   },
//   itemName: {
//     color: "rgba(244,119,33,1)",
//     fontSize: 14, // Slightly adjusted for better readability
//     fontFamily: "Prompt-Regular", // Ensure this font is available in your project
//     marginBottom: 2, // Adjusted for consistency
//   },
//   itemQuantity: {
//     color: "rgba(51,51,51,1)",
//     fontSize: 14, // Consistent with the title's font size
//     fontFamily: "Prompt-SemiBold", // Ensure this font is available in your project
//   },
//   viewDetailsLink: {
//         color: "#0277D3",
//         fontSize: 12,
//         fontFamily: "Prompt-Medium",
//         textDecorationLine: "underline",
//       },
// });
