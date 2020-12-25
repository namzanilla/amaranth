import React from 'react';
import {LoadingWrap} from './style';
import Spinner from 'components/Spinner';

export default () => {
  return (
    <LoadingWrap>
      <Spinner />
    </LoadingWrap>
  );
}
