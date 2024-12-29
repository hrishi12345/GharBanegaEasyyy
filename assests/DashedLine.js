import React from 'react';
import {Svg, Line} from 'react-native-svg';

const DashedLine = ({height}) => {
  return (
    <Svg width="2" height={height} viewBox={`0 0 2 ${height}`}>
      <Line
        x1="1"
        y1="0"
        x2="1"
        y2={height}
        stroke="#0277D3"
        strokeWidth="1"
        strokeDasharray="10,5"
      />
    </Svg>
  );
};

export default DashedLine;
