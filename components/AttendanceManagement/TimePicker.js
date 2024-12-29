import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const TimePicker = ({ initialTime, onSave, onCancel }) => {
    const [selectedTime, setSelectedTime] = useState(initialTime);
    const [worker,selectedWorker]=useState()
    const incrementValue = (key, max) => {
      setSelectedTime(prev => ({
        ...prev,
        [key]: prev[key] === max ? (key === 'period' ? 'AM' : 0) : (key === 'period' ? 'PM' : prev[key] + 1)
      }));
    };
  
    const decrementValue = (key, max) => {
      setSelectedTime(prev => ({
        ...prev,
        [key]: prev[key] === (key === 'period' ? 'AM' : 0) ? (key === 'period' ? 'PM' : max) : (key === 'period' ? 'AM' : prev[key] - 1)
      }));
    };
  
    const TimeUnit = ({ value, onIncrement, onDecrement }) => (
      <View style={styles.timeUnit}>
        <TouchableOpacity onPress={onIncrement}>
          <Text style={styles.arrowButton}>▲</Text>
        </TouchableOpacity>
        <Text style={styles.timeValue}>{value.toString().padStart(2, '0')}</Text>
        <TouchableOpacity onPress={onDecrement}>
          <Text style={styles.arrowButton}>▼</Text>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Set Time</Text>
        <View style={styles.pickerContainer}>
          <TimeUnit
            value={selectedTime.hours}
            onIncrement={() => incrementValue('hours', 12)}
            onDecrement={() => decrementValue('hours', 12)}
          />
          <Text style={styles.separator}>:</Text>
          <TimeUnit
            value={selectedTime.minutes}
            onIncrement={() => incrementValue('minutes', 59)}
            onDecrement={() => decrementValue('minutes', 59)}
          />
          <Text style={styles.separator}>:</Text>
          <TimeUnit
            value={selectedTime.seconds}
            onIncrement={() => incrementValue('seconds', 59)}
            onDecrement={() => decrementValue('seconds', 59)}
          />
          <TouchableOpacity onPress={() => setSelectedTime(prev => ({ ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' }))}>
            <Text style={styles.periodButton}>{selectedTime.period}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={() => onSave(selectedTime)}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: responsiveWidth(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: responsiveWidth(90),
    maxWidth: 400,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: responsiveWidth(5),
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveWidth(5),
  },
  timeUnit: {
    alignItems: 'center',
    width: responsiveWidth(15),
  },
  timeValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginVertical: responsiveWidth(2),
  },
  arrowButton: {
    fontSize: 20,
    color: '#FF7F50',
    fontWeight: '600',
  },
  separator: {
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: responsiveWidth(2),
    color: '#333',
  },
  periodButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF7F50',
    marginLeft: responsiveWidth(4),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveWidth(5),
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: responsiveWidth(2.5),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FF7F50',
    paddingVertical: responsiveWidth(2.5),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default TimePicker;