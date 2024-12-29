import React from 'react';
import Svg, {Rect, Path, G} from 'react-native-svg';

const BackIcon = () => (
  <Svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Rect x="0.5" y="0.5" width="25" height="25" rx="3.5" stroke="#0277D3" />

    <Path
      d="M8.83333 16.3333L5.5 13M5.5 13L8.83333 9.66663M5.5 13L20.5 13"
      stroke="#0277D3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <G transform="translate(4 8)">
      <Path
        d="M4.83333 8.33329L1.5 4.99996M1.5 4.99996L4.83333 1.66663M1.5 4.99996L16.5 4.99996"
        stroke="#0277D3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default BackIcon;
