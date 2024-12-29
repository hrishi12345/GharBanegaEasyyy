import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainLayout from '../../components/Tabs/MainLayout';
import {useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native'; // Added useFocusEffect
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/url';

export default function AdminInventoryTracker() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false); // New state to track "View More"

  const projects = useSelector(state => state.projects.projects);
  const navigation = useNavigation();
  const userRole = useSelector(state => state.auth.user?.userType);

  // Fetch inventory data
  const fetchOwnerInventory = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/owner-inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('inventory data ', response.data.inventory);
      setInventory(response.data.inventory);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching owner inventory:', err);
      setError('Failed to load inventory data. Please try again later.');
      setIsLoading(false);
    }
  };

  // Trigger fetchOwnerInventory when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchOwnerInventory();
    }, []),
  );

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

    // Show either all items or just the first 5 based on the `showAllItems` state
    const displayedInventory = showAllItems ? inventory : inventory.slice(0, 5);
    const remainingItems = inventory.length - 5;

    return (
      <View style={styles.inventoryList}>
        <Text style={styles.inventoryTitle}>Requirement of all projects:</Text>
        <View style={styles.inventory2}>
          <View style={styles.inventoryHeader}>
            <Text style={styles.headerText}>Item</Text>
            <Text style={styles.headerText}>Quantity</Text>
          </View>
          {displayedInventory.map((item, index) => (
            <View key={index} style={styles.inventoryItem}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.quantityText}>
                {item.totalQuantity} {item.units}
              </Text>
            </View>
          ))}
          {!showAllItems && remainingItems > 0 && (
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => setShowAllItems(true)} // When clicked, show all items
            >
              <Text style={styles.viewMoreText}>
                View More ({remainingItems})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <MainLayout style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}>Inventory Management</Text>
      </View>
      <ScrollView style={styles.content}>
        {renderInventoryContent()}
        <View style={styles.projectList}>
          {projects.map(project => (
            <TouchableOpacity
              key={project._id}
              style={styles.projectItem}
              onPress={() =>
                navigation.navigate('SuperVisorInventory', {project})
              }>
              <Text style={styles.projectName}>{project.projectName}</Text>
              <View style={styles.siteRow}>
                <Text style={styles.siteName}>{project.projectCity}</Text>
                <View style={styles.viewProgressContainer}>
                  <Text style={styles.viewProgressText}>View Details</Text>
                  <View style={styles.underline} />
                </View>
              </View>
              <View style={styles.borderBottom} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 44, // Accounting for status bar
  },
  container2: {
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  projectList: {
    flex: 1,
  },
  projectItem: {
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0277D3',
    marginBottom: 4,
    fontFamily: 'Prompt-Medium',
  },
  siteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  siteName: {
    fontSize: 12,
    color: '#333333',
    fontFamily: 'Prompt-Medium',
  },
  viewProgressContainer: {
    alignItems: 'flex-end',
  },
  viewProgressText: {
    fontSize: 12,
    color: '#0277D3',
    fontFamily: 'Prompt-Medium',
  },
  underline: {
    height: 1,
    backgroundColor: '#0277D3',
    width: '100%',
    marginTop: 2,
  },
  borderBottom: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 12,
    marginLeft: -10, // Adjust this value to move the border start position
    marginRight: 0, // Ensures the border ends exactly below "View Progress"
  },
  content: {
    flex: 1,
  },
  inventoryList: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  inventoryTitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
    fontFamily: 'Prompt-Medium',
  },
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    color: '#0277D3',
    fontFamily: 'Prompt-Bold',
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
    fontFamily: 'Prompt-Medium',
  },
  quantityText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
    fontFamily: 'Prompt-Medium',
  },
  viewMoreButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  viewMoreText: {
    color: '#0277D3',
    fontSize: 14,
    fontWeight: '500',
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
  inventory2: {
    borderWidth: 0.7,
    borderColor: '#E0E0E0',
    padding: 20,
    borderRadius: 8,
  },
});
