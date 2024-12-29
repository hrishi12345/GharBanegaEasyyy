import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabBar from './TabBar'; // Adjust the import based on your file structure

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default MainLayout;