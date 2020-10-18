import React from 'react';
import Hamburger from 'components/Hamburger';
import {
  HamburgerWrap,
  SubHeaderWrap,
} from './style';

export default (props) => {
  const href = props.languageId === 1 ? '/c' : '/ru/c';

  return (
    <SubHeaderWrap>
      <div>
        <HamburgerWrap
          href={href}
          onClick={hamburgerOnClick(props, href)}
        >
          <Hamburger />
        </HamburgerWrap>
      </div>
    </SubHeaderWrap>
  );
};

const hamburgerOnClick = (props, href) => {
  return (e) => {
    e.preventDefault();
    props.history.push(href);
  };
}
