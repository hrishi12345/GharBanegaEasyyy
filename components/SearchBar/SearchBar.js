import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SearchLogo } from '../../assests/SearchLogo';

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <SearchLogo />
    <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#C4C4C4"
      />
  </View>
  );
  
  const styles = StyleSheet.create({
  searchContainer: {
  flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#E0E0E0',
      borderWidth: 1,
      borderRadius: 24,
      paddingHorizontal: 10,
      height: 40,
      backgroundColor: 'white',
      flex: 1, 
      marginRight: 10, 
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
  width:'100%'
    },
    input: {
      flex: 1,
      color: '#000',
      marginLeft: 10,
      fontSize: 16,
    },
  });
  
  export default SearchBar