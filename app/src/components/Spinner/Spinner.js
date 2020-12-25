import React from 'react';
import {SpinnerWrap} from './style';

export default (props) => {
  const {
    strokeWidth = 2,
    size = 64,
  } = props;

  const cx = size / 2;

  return (
    <SpinnerWrap size={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="path"
        cx={cx}
        cy={cx}
        r="20"
        fill="none"
        strokeWidth={strokeWidth}
      />
    </SpinnerWrap>
  );
};
