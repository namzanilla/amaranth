import React from 'react';
import Hamburger from 'components/Hamburger';
import PhoneIcon from 'components/Icons/Phone';
import CartIcon from 'components/Icons/Cart';
import {
  CartLinkWrap,
  PhoneWrap,
  HamburgerWrap,
  SubHeaderWrap,
} from './style';

export default (props) => {
  return (
    <SubHeaderWrap>
      <div>
        <div>
          <HamburgerWrap
            href={hamburgerHref(props.languageId)}
            onClick={linkOnClick(props, hamburgerHref(props.languageId))}
          >
            <Hamburger />
          </HamburgerWrap>
          <PhoneWrap href="tel:+380662927527">
            <PhoneIcon />
            <span>+38 (066) 292 75 27</span>
          </PhoneWrap>
        </div>
        <CartLinkWrap
          href={cartHref(props.languageId)}
          onClick={linkOnClick(props, cartHref(props.languageId))}
        >
          <CartIcon />
        </CartLinkWrap>
      </div>
    </SubHeaderWrap>
  );
};

const cartHref = (languageId) => {
  return languageId === 1 ? '/cart' : '/ru/cart';
}

const hamburgerHref = (languageId) => {
  return languageId === 1 ? '/c' : '/ru/c';
}

const linkOnClick = (props, href) => {
  return (e) => {
    e.preventDefault();
    props.history.push(href);
  };
}
