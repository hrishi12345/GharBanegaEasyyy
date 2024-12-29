import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SuperVisorAttendanceCard = ({attendances, count}) => {
  const navigation = useNavigation();
  console.log('attejdac', attendances[0], count);
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerTitle}>Attendance Management</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AttendaceTracker')}>
            <Text style={styles.viewDetailsLink}>View details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.circleContainer}>
            <View style={styles.circleOuter}>
              <View style={styles.circleInner}>
                <Text style={styles.percentage}>80%</Text>
              </View>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>No.of Sites</Text>
              <Text style={styles.statValue}>{attendances?.length ?? 0}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>No.of Workers</Text>
              <Text style={styles.statValue}>{count}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 187,
  },
  cardWrapper: {
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 10,
    padding: 10,
  },
  circleContainer: {
    margin: 10,
  },
  circleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 8,
    margin: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Prompt-Medium',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    color: 'black',
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#F1F1F1',
  },
});

export default SuperVisorAttendanceCard;
