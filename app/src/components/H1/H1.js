import React from 'react';
import {
  H1Wrap,
  H1,
} from './style';

export default (props) => {
  return (
    <H1Wrap>
      <H1>
        {props.child}
      </H1>
    </H1Wrap>
  );
};
