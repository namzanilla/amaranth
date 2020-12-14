import React, {useEffect, useState} from 'react';
import Hamburger from 'components/Hamburger';
import CloseIcon from 'components/Icons/Close';
import PhoneIcon from 'components/Icons/Phone';
import CartIcon from 'components/Icons/Cart';
import Categories from 'components/Categories';
import H1 from 'components/H1';
import {getLoadingText} from 'helpers/language';
import {
  CartLinkWrap,
  PhoneWrap,
  HamburgerWrap,
  SubHeaderWrap,
} from './style';

export default (props) => {
  const [loading, setLoading] = useState(true);
  const [h1, setH1] = useState(getH1(props.languageId, true));
  const [catalogIsVisible, setCatalogIsVisible] = useState(props.catalogIsVisible);

  useEffect(() => {
    if (catalogIsVisible !== props.catalogIsVisible) {
      setCatalogIsVisible(props.catalogIsVisible);

      setLoading(true);

      if (props.catalogIsVisible) {
        fetchCategoryList(props, props.catalogIsVisible, setLoading);
      } else if (props.catalogScrollY) {
        window.scrollBy(0, props.catalogScrollY);
      }
    }
  }, [props.catalogIsVisible]);

  useEffect(() => {
    const h1 = getH1(props.languageId, loading);

    setH1(h1);
  }, [loading]);

  return (
    <>
      <SubHeaderWrap>
        <div>
          <div>
            <HamburgerWrap
              href={hamburgerHref(props.languageId)}
              onClick={hamburgerOnClick(props, hamburgerHref(props.languageId))}
              background={props.catalogIsVisible ? '#FFE2E4' : '#FFCBA5'}
            >
              {props.catalogIsVisible ? <CloseIcon /> : <Hamburger />}
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
      {props.catalogIsVisible ? (
        <>
          <H1 child={h1} />
          {loading ? null : <Categories history={props.history} />}
        </>
      ) : null}
    </>
  );
};

const cartHref = (languageId) => {
  return languageId === 1 ? '/cart' : '/ru/cart';
}

const hamburgerHref = (languageId) => {
  return languageId === 1 ? '/c' : '/ru/c';
}

function hamburgerOnClick(props) {
  return function (e) {
    e.preventDefault();

    if (props.hoc === 'CategoriesPage') {
      return false;
    }

    if (props.catalogIsVisible) {
      props.appSetCatalogState({
        isVisible: !props.catalogIsVisible,
      });
    } else {
      props.appSetCatalogState({
        isVisible: !props.catalogIsVisible,
        scrollY: window.scrollY,
      });
    }
  }
}

const linkOnClick = (props, pathname) => {
  return (e) => {
    e.preventDefault();
    
    props.history.push({
      pathname,
      search: '',
    });
  };
}

function fetchCategoryList(props, catalogIsVisible, setLoading) {
  props.fetchCategoryList().then(() => {
    if (catalogIsVisible) setLoading(false);
  });
}

function getH1(languageId, loading) {
  if (loading) {
    return getLoadingText(languageId);
  }

  return languageId === 1
    ? 'Каталог товарів'
    : 'Каталог товаров';
}
