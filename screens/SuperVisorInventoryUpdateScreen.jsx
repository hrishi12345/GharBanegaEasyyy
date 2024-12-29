import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PendingInventory from '../components/InventoryManagement/PendingInventory';
import ApprovedInventory from '../components/InventoryManagement/ApprovedInventory';
import BackIcon from '../assests/BackIcon';

const SuperVisorInventoryUpdateScreen = ({route}) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(null);
  const {project1} = route.params; // Get the project object from the route

  useEffect(() => {
    if (project1) {
      setProject(project1); // Set project from params
      setIsLoading(false); // Stop loading since we have the project data
    }
  }, [project]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText,
            ]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'approved' && styles.activeTab]}
          onPress={() => setActiveTab('approved')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'approved' && styles.activeTabText,
            ]}>
            Approved
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'pending' ? (
          <PendingInventory projectId={project._id} />
        ) : (
          <ApprovedInventory projectId={project._id} />
        )}
      </View>
    </SafeAreaView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
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

export default SuperVisorInventoryUpdateScreen;
