import React from 'react';
import Svg, {Path} from 'react-native-svg';

const WorkerIcon = () => {
  return (
    <Svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
        stroke="#0277D3"
        strokeWidth="1.5"
      />
      <Path
        d="M12 12C12 13.105 12 14 8 14C4 14 4 13.105 4 12C4 10.895 5.79 10 8 10C10.21 10 12 10.895 12 12Z"
        stroke="#0277D3"
        strokeWidth="1.5"
      />
      <Path
        d="M1 9C1 5.229 1 3.343 2.172 2.172C3.344 1.001 5.229 1 9 1H13C16.771 1 18.657 1 19.828 2.172C20.999 3.344 21 5.229 21 9C21 12.771 21 14.657 19.828 15.828C18.656 16.999 16.771 17 13 17H9C5.229 17 3.343 17 2.172 15.828C1.001 14.656 1 12.771 1 9Z"
        stroke="#0277D3"
        strokeWidth="1.5"
      />
      <Path
        d="M18 9H14M18 6H13M18 12H15"
        stroke="#0277D3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default WorkerIcon;
