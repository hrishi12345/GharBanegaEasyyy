import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../assests/BackIcon';
import InvoiceIcon2 from '../assests/InvoiceIcon2';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../utils/url';

const ClientPaymentTracker = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Payment Management</Text>
      </View>

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
                <TouchableOpacity style={styles.payNowButton}>
                  <Text style={styles.payNowButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: "Prompt-Medium",
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
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
  amountIdText: {
    fontSize: 14,
    color: '#0277D3',
    marginBottom: 4,
    fontFamily: "Prompt-Medium",
  },
  invoiceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  payNowButton: {
    backgroundColor: '#0277D3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  payNowButtonText: {
    color: 'white',
    fontFamily: "Prompt-Medium",
  },
});

export default ClientPaymentTracker;
