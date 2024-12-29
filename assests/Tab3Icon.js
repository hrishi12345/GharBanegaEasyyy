import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Tab3Icon = ({ size = 21, color = 'white' }) => {
  return (
    <Svg
      width={size}
      height={size * (22 / 21)} // maintain the aspect ratio of 21x22
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.7096 9.19697C11.9247 9.19697 13.7204 7.46179 13.7204 5.32133C13.7204 3.18087 11.9247 1.44568 9.7096 1.44568C7.49453 1.44568 5.69885 3.18087 5.69885 5.32133C5.69885 7.46179 7.49453 9.19697 9.7096 9.19697Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M15.7257 9.48769L17.0623 10.6504L19.7365 7.74365"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.7291 16.9483C17.7311 16.7894 17.7311 16.6276 17.7311 16.4639C17.7311 14.0561 14.1395 12.1038 9.70961 12.1038C5.27974 12.1038 1.68811 14.0561 1.68811 16.4639C1.68811 18.8716 1.68811 20.824 9.70961 20.824C11.9466 20.824 13.5599 20.6718 14.7231 20.4006"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Tab3Icon;
