import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';


const InvoiceIcon2 = () => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3.5 16.3335V11.6668C3.5 7.26733 3.5 5.067 4.86733 3.70083C6.23467 2.33466 8.43383 2.3335 12.8333 2.3335H15.1667C19.5662 2.3335 21.7665 2.3335 23.1327 3.70083C23.8957 4.46266 24.2328 5.4835 24.381 7.00016M24.5 11.6668V16.3335C24.5 20.733 24.5 22.9333 23.1327 24.2995C21.7653 25.6657 19.5662 25.6668 15.1667 25.6668H12.8333C8.43383 25.6668 6.2335 25.6668 4.86733 24.2995C4.10433 23.5377 3.76717 22.5168 3.619 21.0002M9.33333 16.3335H15.1667M9.33333 11.6668H10.5M18.6667 11.6668H14"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default InvoiceIcon2;
