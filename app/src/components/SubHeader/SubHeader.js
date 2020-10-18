import React from 'react';
import Hamburger from 'components/Hamburger';
import PhoneIcon from 'components/Icons/Phone';
import {
  PhoneWrap,
  HamburgerWrap,
  SubHeaderWrap,
} from './style';

export default (props) => {
  const href = props.languageId === 1 ? '/c' : '/ru/c';

  return (
    <SubHeaderWrap>
      <div>
        <div>
          <HamburgerWrap
            href={href}
            onClick={hamburgerOnClick(props, href)}
          >
            <Hamburger />
          </HamburgerWrap>
          <PhoneWrap href="tel:+380662927527">
            <PhoneIcon />
            <span>+38 (066) 292 75 27</span>
          </PhoneWrap>
        </div>
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
