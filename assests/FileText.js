import React from 'react';
import {
  Svg,
  G,
  Rect,
  Path,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

const FileText = () => {
  return (
    <Svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <Filter
          id="filter0_d_305_1482"
          x="0"
          y="0"
          width="74.3882"
          height="72"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="2" />
          <FeGaussianBlur stdDeviation="8" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.491667 0 0 0 0 0.491667 0 0 0 0 0.491667 0 0 0 0.05 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_305_1482"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_305_1482"
            result="shape"
          />
        </Filter>
      </Defs>

      <G filter="url(#filter0_d_305_1482)">
        <Rect
          x="16"
          y="14"
          width="42.3881"
          height="40"
          rx="20"
          fill="#0277D3"
        />
        <Rect
          x="16.5"
          y="14.5"
          width="41.3881"
          height="39"
          rx="19.5"
          stroke="#F1F1F1"
        />
      </G>

      <Svg
        x="23.5"
        y="18"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3.5 16.3335V11.6668C3.5 7.26733 3.5 5.067 4.86733 3.70083C6.23467 2.33466 8.43383 2.3335 12.8333 2.3335H15.1667C19.5662 2.3335 21.7665 2.3335 23.1327 3.70083C23.8957 4.46266 24.2328 5.4835 24.381 7.00016M24.5 11.6668V16.3335C24.5 20.733 24.5 22.9333 23.1327 24.2995C21.7653 25.6657 19.5662 25.6668 15.1667 25.6668H12.8333C8.43383 25.6668 6.2335 25.6668 4.86733 24.2995C4.10433 23.5377 3.76717 22.5168 3.619 21.0002M9.33333 16.3335H15.1667M9.33333 11.6668H10.5M18.6667 11.6668H14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    </Svg>
  );
};

export default FileText;
