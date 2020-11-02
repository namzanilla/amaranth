import React from 'react';
import {H1Wrap} from './style';

export default (props) => {
  return (
    <H1Wrap>
      {props.child}
    </H1Wrap>
  );
};
