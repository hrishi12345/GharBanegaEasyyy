import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import RationRequest from './RationRequest';
import BackIcon from '../../assests/BackIcon';
import ApprovedInventory from '../InventoryManagement/ApprovedInventory';
import EarlyPayRequest from './EarlyPayRequest';

const PaymentManagement = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Ration Requests');
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Inventory Management</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Ration Requests' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Ration Requests')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Ration Requests' && styles.activeTabText,
            ]}>
            Ration Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Early Pay Requests' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Early Pay Requests')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Early Pay Requests' && styles.activeTabText,
            ]}>
            Early Pay Requests
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'Ration Requests' ? (
          <RationRequest />
        ) : (
          <EarlyPayRequest />
        )}
      </View>
    </View>
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
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  projectInfo: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  projectName: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    color: '#0277D3',
    marginBottom: 8,
  },
  projectSite: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  tabContainer: {
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
    fontFamily: 'Prompt-Medium',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    textAlign: 'center',
    color: '#242424',
  },
  activeTabText: {
    color: '#FEFEFE',
    fontFamily: 'Prompt-Medium',
  },
  contentContainer: {
    flex: 1,
  },
});
export default PaymentManagement;
