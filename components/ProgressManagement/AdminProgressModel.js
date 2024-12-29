import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/url';

const {width} = Dimensions.get('window');

const AdminProgressModal = ({visible, onClose, projectId}) => {
  const [progressStages, setProgressStages] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchProgressStages();
    }
  }, [visible]);

  const fetchProgressStages = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/progress/admin-project-stages/${projectId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (response.data.success) {
        setProgressStages(response.data.data || []);
        setSelectedStages(
          response.data.data
            .filter(stage => stage.completed)
            .map(stage => stage.stageName),
        );
      } else {
        Alert.alert('Error', 'Failed to load progress stages.');
      }
    } catch (error) {
      console.error('Error fetching progress stages:', error);
      Alert.alert('Error', 'Failed to fetch progress stages.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStageSelection = stageName => {
    setSelectedStages(prevSelected =>
      prevSelected.includes(stageName)
        ? prevSelected.filter(name => name !== stageName)
        : [...prevSelected, stageName],
    );
  };

  const handleUpdateProgress = async () => {
    if (selectedStages.length === 0) {
      Alert.alert('Error', 'Please select at least one stage.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.patch(
        `${API_URL}/projects/edit-project/${projectId}`,
        {completedProgressStages: selectedStages},
        {headers: {Authorization: `Bearer ${token}`}},
      );

      if (response.data.success) {
        Alert.alert('Success', 'Progress updated successfully!');
        onClose();
      } else {
        Alert.alert('Error', 'Failed to update progress.');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      Alert.alert('Error', 'Failed to update progress.');
    }
  };

  const renderStages = () => {
    const leftColumn = [];
    const rightColumn = [];

    progressStages.forEach((stage, index) => {
      const stageElement = (
        <View key={index} style={styles.stageContainer}>
          <CheckBox
            value={selectedStages.includes(stage.stageName)}
            onValueChange={() => toggleStageSelection(stage.stageName)}
            disabled={stage.completed}
            tintColors={{true: '#0277D3', false: '#999'}}
            style={styles.checkbox}
          />
          <Text
            style={[
              styles.stageText,
              stage.completed && styles.completedStageText,
            ]}>
            {stage.stageName}
          </Text>
        </View>
      );

      if (index % 2 === 0) {
        leftColumn.push(stageElement);
      } else {
        rightColumn.push(stageElement);
      }
    });

    return (
      <View style={styles.columnsContainer}>
        <View style={styles.column}>{leftColumn}</View>
        <View style={styles.column}>{rightColumn}</View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Progress</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0277D3" />
              ) : progressStages.length === 0 ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>
                    No progress data available
                  </Text>
                </View>
              ) : (
                <ScrollView contentContainerStyle={styles.stagesContainer}>
                  {renderStages()}
                </ScrollView>
              )}
              <TouchableOpacity
                style={[
                  styles.updateButton,
                  selectedStages.length === 0 && styles.disabledButton,
                ]}
                onPress={handleUpdateProgress}
                disabled={selectedStages.length === 0}>
                <Text style={styles.updateButtonText}>Update Progress</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0277D3',
  },
  stagesContainer: {
    padding: 10,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    color: 'gray',
    fontSize: 16,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  stageText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  completedStageText: {
    color: '#999',
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: '#0277D3',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#F5C7A9',
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AdminProgressModal;
