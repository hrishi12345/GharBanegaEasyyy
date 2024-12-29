import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Tab2Icon from '../../assests/Tab2Icon';
import HomeIcon from '../../assests/HomeIcon';
import Tab3Icon from '../../assests/Tab3Icon';
import CircleWithImageIcon from '../../assests/CircleWithImageIcon';
import CenterIcon from '../../assests/CenterIcon';
import {useNavigation} from '@react-navigation/native';
import InvoiceIcon from '../../assests/InvoiceIcon';
import {useSelector} from 'react-redux';

const TabBar2 = () => {
  const [activeTab, setActiveTab] = useState('home');
  const employeeData = {
    avatar: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    id: 'EMP001',
    designation: 'Software Engineer',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
  };
  const navigation = useNavigation();
  const userRole = useSelector(state => state.auth.user?.userType);

  const leftTabs = [
    {key: 'home ', icon: 'home-outline'},
    {key: 'document', icon: 'document-outline'},
  ];

  const rightTabs = [
    {key: 'user', icon: 'person-outline'},
    {key: 'settings', icon: 'settings-outline'},
  ];

  const renderTabs = tabs =>
    tabs.map(tab => (
      <TouchableOpacity
        key={tab.key}
        style={styles.tab}
        onPress={() => setActiveTab(tab.key)}>
        <Icon
          name={tab.icon}
          size={responsiveFontSize(3)}
          color={activeTab === tab.key ? '#0277D3' : 'white'}
        />
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.leftIconContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Home')}>
          <HomeIcon size={responsiveFontSize(3)} />
        </TouchableOpacity>

       
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('ClientPayment')}>
            <InvoiceIcon size={responsiveFontSize(3)} />
          </TouchableOpacity>
        
      </View>
      <View style={styles.rightIconContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('ProgressTracker')}>
          <CenterIcon size={responsiveFontSize(3)} />
        </TouchableOpacity>
       
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              navigation.navigate('Profile', {employee: employeeData});
            }}>
            <CircleWithImageIcon
              size={responsiveFontSize(3.5)}
              color="white"
              imageUri="https://img.clipart-library.com/2/clip-man-profile/clip-man-profile-38.png"
            />
          </TouchableOpacity>
        
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0277D3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  leftIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '45%',
  },
  rightIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '45%',
  },
  tab: {
    padding: 10,
  },
  centerButtonContainer: {
    position: 'absolute',
    top: -25,
    left: '55%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: -30}],
  },
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0277D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar2;
