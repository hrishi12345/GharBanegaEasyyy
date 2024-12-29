// import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Dimensions } from 'react-native';
// import React, { useEffect, useState, useCallback } from 'react';
// import RequestedInventory from '../components/InventoryManagement/RequestedInventory';
// import RequestedHistory from '../components/InventoryManagement/RequestedHistory';
// import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// import BackIcon from '../assests/BackIcon';
// import { API_URL } from '../utils/url';
// import NotificationIcon from '../assests/NotificationIcon';

// const SuperVisorInventoryScreen = () => {
//     const [inventory, setInventory] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState('daily');
//     const [isFocused, setIsFocused] = useState(false);

//     const navigation = useNavigation();
//     const route = useRoute();

//     const {project} = route.params;

//     const fetchInventoryData = useCallback(async () => {
//         try {
//             setIsLoading(true);
//             const token = await AsyncStorage.getItem('token');
//             console.log('Token:', token);

//             if (token) {
//                 const response = await axios.get(
//                     `${API_URL}/inventory?projectId=${project._id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     },
//                 );
//                 const materials = response.data.inventories[0]?.materials || [];
//                 setInventory(materials);
//             }
//         } catch (error) {
//             console.error('Error fetching inventory data:', error);
//             setError('Failed to fetch inventory data. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     }, [project._id]);

//     useEffect(() => {
//         fetchInventoryData();
//     }, [fetchInventoryData, isFocused]);

//     useFocusEffect(
//         useCallback(() => {
//             setIsFocused(true);
//             return () => {
//                 setIsFocused(false);
//             };
//         }, [])
//     );
//     const renderItem = useCallback(({ item }) => (

//       <View style={styles.inventoryItem}>
//         <Text style={styles.itemName}>{item.itemName}</Text>
//         <View style={styles.quantityBox}>
//           <Text style={styles.quantityText}>
//             {item.quantity} {item.units}
//           </Text>
//         </View>
//       </View>
//     ), []);

//     const keyExtractor = useCallback((item) => item._id, []);

//     const renderInventoryContent = () => {
//       if (isLoading) {
//         return <ActivityIndicator size="large" color="#0277D3" />;
//       }

//       if (error) {
//         return <Text style={styles.errorText}>{error}</Text>;
//       }

//       if (inventory.length === 0) {
//         return <Text style={styles.noMaterialsText}>No materials available</Text>;
//       }

//       return (
//         <View style={[styles.inventoryList]}>
// <TouchableOpacity style={styles.currentInventory} onPress={() => navigation.navigate('SuperVisorInventoryUpdate', { project1: project })}>

//           <NotificationIcon />
//           <Text style={{color:'#0277D3',textAlign:'center', fontFamily: "Prompt-Bold"}}>Inventory Updates</Text>
//           </TouchableOpacity>
//           <FlatList
//             data={inventory}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             contentContainerStyle={styles.flatListContent}
//           />
//         </View>
//       );
//     };

//   return (
//     <View style={styles.container}>
//     <View style={styles.container2}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <BackIcon />
//       </TouchableOpacity>
//       <Text style={styles.mainHeader}>Inventory Management</Text>
//     </View>

//     <View style={styles.projectInfo}>
//       <Text style={styles.projectName}>{project.projectName}</Text>
//       <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
//     </View>
//     <View >

//       <Text style={styles.inventoryText}>Current Inventory </Text>
//       </View>
//       {renderInventoryContent()}
//       <View style={styles.attendanceHeader}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
//           onPress={() => setActiveTab('daily')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 'daily' && styles.activeTabText,
//             ]}
//           >
//             Requested Inventory
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'history' && styles.activeTab]}
//           onPress={() => setActiveTab('history')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 'history' && styles.activeTabText,
//             ]}
//           >
//             Requested History
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : activeTab === 'daily' ? (
//         <RequestedInventory projectId={project._id}/>
//       ) : (
//         <RequestedHistory projectId={project._id}/>
//       )}
//     </View>
//   );
// };
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import RequestedInventory from '../components/InventoryManagement/RequestedInventory';
import RequestedHistory from '../components/InventoryManagement/RequestedHistory';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import BackIcon from '../assests/BackIcon';
import {API_URL} from '../utils/url';
import NotificationIcon from '../assests/NotificationIcon';

const SuperVisorInventoryScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('daily');
  const [isFocused, setIsFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const {project} = route.params;

  const fetchInventoryData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

      if (token) {
        const response = await axios.get(
          `${API_URL}/inventory?projectId=${project._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const materials = response.data.inventories[0]?.materials || [];
        setInventory(materials);
      }
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      setError('Failed to fetch inventory data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [project._id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchInventoryData();
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchInventoryData]);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  useFocusEffect(
    useCallback(() => {
      fetchInventoryData();
      return () => {
        setIsFocused(false);
      };
    }, [fetchInventoryData]),
  );

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.inventoryItem}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <View style={styles.quantityBox}>
          <Text style={styles.quantityText}>
            {item.quantity} {item.units}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback(item => item._id, []);

  const renderInventoryContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0277D3" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (inventory.length === 0) {
      return <Text style={styles.noMaterialsText}>No materials available</Text>;
    }

    return (
      <View style={styles.inventoryList}>
        <TouchableOpacity
          style={styles.currentInventory}
          onPress={() =>
            navigation.navigate('SuperVisorInventoryUpdate', {
              project1: project,
            })
          }>
          <NotificationIcon />
          <Text
            style={{
              color: '#0277D3',
              textAlign: 'center',
              fontFamily: 'Prompt-Bold',
            }}>
            Inventory Updates
          </Text>
        </TouchableOpacity>
        <FlatList
          data={inventory}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0277D3']}
          tintColor="#0277D3"
        />
      }
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Inventory Management</Text>
      </View>

      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
      </View>

      <View>
        <Text style={styles.inventoryText}>Current Inventory</Text>
      </View>

      {renderInventoryContent()}

      <View style={styles.attendanceHeader}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'daily' && styles.activeTabText,
            ]}>
            Requested Inventory
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText,
            ]}>
            Requested History
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : activeTab === 'daily' ? (
        <RequestedInventory projectId={project._id} />
      ) : (
        <RequestedHistory projectId={project._id} />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    padding: 16,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  mainHeader: {
    fontSize: 18,

    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
    fontFamily: 'Prompt-Medium',
  },
  projectInfo: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontFamily: 'Prompt-Medium',
  },
  projectName: {
    fontSize: 14,

    color: '#0277D3',
    marginBottom: 8,
    fontFamily: 'Prompt-Medium',
  },
  projectSite: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  inventoryList: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    marginBottom: 16,
    height: 'auto',
    padding: 20,
  },
  flatListContent: {
    padding: 5, // Reduced padding to minimize space between items
    marginBottom: 0, // Removed unnecessary margin below the list
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6, // Reduced margin between items to tighten the spacing
  },

  itemName: {
    fontSize: 14,

    color: '#333333',
    fontFamily: 'Prompt-Medium',
  },
  quantityBox: {
    backgroundColor: '#F7F5FF',
    borderRadius: 12,
    padding: 8,
  },
  quantityText: {
    fontSize: 10,

    color: '#242424',
    fontFamily: 'Prompt-Medium',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  noMaterialsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Prompt-Medium',
  },
  attendanceHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 8,

    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#242424',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,

    textAlign: 'center',
    color: '#242424',
    fontFamily: 'Prompt-Medium',
  },
  activeTabText: {
    color: '#FEFEFE',
    fontFamily: 'Prompt-Medium',
  },
  inventoryText: {
    fontSize: 15,
    color: '#333333',

    marginBottom: 10,
    fontFamily: 'Prompt-Medium',
  },
  currentInventory: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    gap: 5,
    fontFamily: 'Prompt-Medium',
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding at the bottom for better scrolling experience
  },
});

export default SuperVisorInventoryScreen;
