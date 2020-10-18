import React from 'react';
import SwitchLanguage from 'components/SwitchLanguage';
import HomeLink from 'components/HomeLink';
import {
  HeaderWrap,
} from './style';

export default (props) => {
  return (
    <HeaderWrap>
      <div>
        <HomeLink
          history={props.history}
          background="#ffa5ac"
        />
        <SwitchLanguage
          history={props.history}
          background="#FFCBA5"
        />
      </div>
    </HeaderWrap>
  );
};
