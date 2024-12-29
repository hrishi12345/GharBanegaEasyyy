import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../utils/url';

const ConfirmListModal = ({
  visible,
  onClose,
  workers,
  time,
  onConfirm,
  projectId2,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(null);

  const absentWorkers = workers.filter(
    worker => worker.status === 'Absent' || worker.status === 'none',
  );
  const halfDayWorkers = workers.filter(worker => worker.status === 'Timeout');
  const presentWorkers = workers.filter(worker => worker.status === 'Present');

  const handleConfirm = async () => {
    setIsConfirming(true);
    setConfirmationSuccess(null);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert(
          'Error',
          'Authentication token not found. Please log in again.',
        );
        setIsConfirming(false);
        return;
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const workersInfo = workers.map(worker => worker.workerId);

      const payload = {
        projectId: projectId2,
        date: currentDate,
        workersInfo,
      };

      const response = await axios.post(
        `${API_URL}/attendance/mark-endday`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setConfirmationSuccess(true);
        setTimeout(() => {
          onClose();
          onConfirm();
        }, 1500); // Wait for 1.5 seconds before closing the modal
      } else {
        throw new Error(
          `Failed to confirm attendance. Status code: ${response.status}`,
        );
      }
    } catch (error) {
      console.error('Error confirming attendance:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
      setConfirmationSuccess(false);
    } finally {
      setIsConfirming(false);
    }
  };

  const renderWorkerList = (workerList, title, showTimeOut = false) => (
    <View>
      <Text style={styles.listTitle}>{title}</Text>
      {workerList.map((worker, index) => (
        <View key={index} style={styles.workerItem}>
          <Image
            source={(() => {
              try {
                return {uri: worker.media[0].compressedUrl};
              } catch (error) {
                return {
                  uri: 'https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png',
                };
              }
            })()}
            style={styles.workerImage}
          />
          <View style={styles.workerInfo}>
            <Text style={styles.workerName}>{worker.name}</Text>
            <Text style={styles.workerContact}>Contact: {worker.mobile}</Text>
          </View>
          {showTimeOut ? (
            <View style={styles.timeOutContainer}>
              <Text style={styles.timeOutLabel}>Time Out:</Text>
              <Text style={styles.timeOutValue}>
                {worker.timeOut || '00:00'}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.statusTag,
                title === 'Absent List'
                  ? styles.absentTag
                  : title === 'Present List'
                  ? styles.presentTag
                  : styles.halfDayTag,
              ]}>
              {title === 'Absent List'
                ? 'A'
                : title === 'Present List'
                ? 'P'
                : 'H'}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Confirm List</Text>
          <Text style={styles.timeText}>Time: {time}</Text>

          <ScrollView style={styles.listContainer}>
            {absentWorkers.length > 0 &&
              renderWorkerList(absentWorkers, 'Absent List')}
            {halfDayWorkers.length > 0 &&
              renderWorkerList(halfDayWorkers, 'Half-day List', true)}
            {presentWorkers.length > 0 &&
              renderWorkerList(presentWorkers, 'Present List')}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              isConfirming ? styles.disabledButton : null,
            ]}
            onPress={handleConfirm}
            disabled={isConfirming}>
            {isConfirming ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm</Text>
            )}
          </TouchableOpacity>

          {confirmationSuccess !== null && (
            <Text
              style={[
                styles.confirmationMessage,
                confirmationSuccess
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}>
              {confirmationSuccess
                ? 'Confirmation successful!'
                : 'Confirmation failed.'}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0277D3',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    maxHeight: 400,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  workerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    paddingBottom: 10,
  },
  workerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  workerContact: {
    fontSize: 14,
    color: '#666',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  absentTag: {
    backgroundColor: '#0277D3',
  },
  presentTag: {
    backgroundColor: '#4CAF50',
  },
  halfDayTag: {
    backgroundColor: '#FFC107',
  },
  timeOutContainer: {
    alignItems: 'center',
  },
  timeOutLabel: {
    fontSize: 12,
    color: '#666',
  },
  timeOutValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#0277D3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmListModal;
