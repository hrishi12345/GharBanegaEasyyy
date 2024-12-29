import React from 'react';
import Svg, { Path, Image, Defs, ClipPath, G } from 'react-native-svg';

const CircleWithImageIcon = ({ size = 29, color = 'white', imageUri }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <Path
        d="M28.1881 14.1347C28.1881 21.1881 22.2634 26.9495 14.9004 26.9495C7.53744 26.9495 1.61279 21.1881 1.61279 14.1347C1.61279 7.08133 7.53744 1.31995 14.9004 1.31995C22.2634 1.31995 28.1881 7.08133 28.1881 14.1347Z"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Clip Path for Image */}
      <Defs>
        <ClipPath id="clip">
          <Path
            d="M28.1881 14.1347C28.1881 21.1881 22.2634 26.9495 14.9004 26.9495C7.53744 26.9495 1.61279 21.1881 1.61279 14.1347C1.61279 7.08133 7.53744 1.31995 14.9004 1.31995C22.2634 1.31995 28.1881 7.08133 28.1881 14.1347Z"
          />
        </ClipPath>
      </Defs>
      {/* Display Image inside the circle */}
      {imageUri && (
        <G clipPath="url(#clip)">
          <Image
            href={{ uri: imageUri }}
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        </G>
      )}
    </Svg>
  );
};

export default CircleWithImageIcon;



