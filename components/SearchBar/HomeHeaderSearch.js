import { View, StyleSheet } from 'react-native';
import React from 'react';
import SearchBar from './SearchBar';
import FilterIcon from '../../assests/FilterIcon';

const HomeHeaderSearch = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <FilterIcon />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      height: 50,
      marginVertical:20
    },
  });
  

export default HomeHeaderSearch;
