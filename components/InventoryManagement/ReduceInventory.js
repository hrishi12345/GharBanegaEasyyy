import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import BackIcon from '../../assests/BackIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../utils/url';

export default function ReduceInventory() {
  const route = useRoute();
  const {inventory: initialInventory} = route.params;
  const [inventory, setInventory] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    // Reset inventory when component mounts or initialInventory changes
    setInventory(
      initialInventory.map(item => ({
        ...item,
        quantity: '', // Clear out quantities
      })),
    );
  }, [initialInventory]);

  const handleQuantityChange = (index, value) => {
    const updatedInventory = [...inventory];
    updatedInventory[index].quantity = value;
    setInventory(updatedInventory);
  };

  const handleSendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

      const requestData = {
        materials: inventory.map(material => ({
          itemName: material.itemName,
          quantity: parseInt(material.quantity) || 0, // Convert to integer
          units: material.units || 'units',
        })),
      };

      if (token) {
        const response = await axios.patch(
          `${API_URL}/inventory/reduce?inventoryId=66d2c49259fe61d781a17ea9`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Request sent successfully:', response.data);
        Alert.alert('Success', 'Inventory updated successfully');

        // Reset inventory after successful API call
        setInventory(
          initialInventory.map(item => ({
            ...item,
            quantity: '',
          })),
        );
        navigation.goBack(); // Navigate back after success
      }
    } catch (error) {
      console.error('Error sending request:', error);
      Alert.alert('Error', 'Failed to update inventory. Please try again.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Reduce Inventory</Text>
      </View>

      <ScrollView style={styles.inventoryList}>
        <View style={styles.listHeader}>
          <Text style={styles.columnHeader}>Item</Text>
          <Text style={styles.columnHeader2}>Quantity</Text>
        </View>
        {inventory.map((material, index) => (
          <View key={index} style={styles.inventoryItem}>
            <Text style={styles.itemName}>{material.itemName}</Text>
            <View style={styles.quantityInputContainer}>
              <TextInput
                style={styles.quantityInput}
                placeholder="Type here..."
                placeholderTextColor="#A0A0A0"
                value={material.quantity.toString()}
                onChangeText={value => handleQuantityChange(index, value)}
              />
              <Text style={styles.unitText}>{material.units || 'Unit'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSendRequest}>
        <Text style={styles.saveButtonText}>Send Update & Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginVertical: 20,
    marginBottom: 50,
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
  },
  inventoryList: {
    flex: 1,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
    borderRadius: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  columnHeader: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
    color: '#0277D3',
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
    flex: 1,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quantityInput: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    marginRight: 8,
    color: 'black',
    fontFamily: 'Prompt-Medium',
  },
  unitText: {
    fontSize: 12,
    color: '#333333',
    width: 30,
    fontFamily: 'Prompt-Medium',
  },
  saveButton: {
    backgroundColor: '#0277D3',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  columnHeader2: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
    color: '#0277D3',
    marginRight: 60,
  },
});
