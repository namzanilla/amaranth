import React, {useEffect} from 'react';
import querystring from 'querystring';
import Style from './style';
import {Helmet} from 'react-helmet';
import {getLangIdByUrlPath} from 'helpers/language';
import {getHoc} from 'helpers/hoc';
import HomePage from 'components/Hoc/HomePage';

// HOCs
import CategoriesPage from 'components/Hoc/CategoriesPage';
import CategoryPage from 'components/Hoc/CategoryPage';
import CartPage from 'components/Hoc/CartPage';
import OrderPage from 'components/Hoc/OrderPage';
import ProductPage from 'components/Hoc/ProductPage';
import NotFoundPage from 'components/Hoc/NotFoundPage';

import Hoc from 'components/Hoc';
import Header from 'components/Header';
import SubHeader from 'components/SubHeader';

const components = {
  HomePage,
  CategoriesPage,
  CategoryPage,
  CartPage,
  OrderPage,
  ProductPage,
  NotFoundPage,
};

export default (props) => {
  const HocChild = components[props.hoc];

  useEffect(() => {
    componentDidMount(props);
  }, []);

  return (
    <>
      <Helmet>
        <html lang={props.htmlLangAttrValue} />
        <link rel="alternate" href={props.alternateUk} hrefLang="uk-UA" />
        <link rel="alternate" href={props.alternateRu} hrefLang="ru-UA" />
      </Helmet>
      <Style />
      <Header history={props.history} />
      <SubHeader history={props.history} />
      <Hoc display={props.catalogIsVisible ? 'none' : 'block'}>
        <HocChild history={props.history} />
      </Hoc>
    </>
  );
};

function componentDidMount(props) {
  props.orderSetContactInfoFromLocalStorage();

  props.history.listen(({location}) => {
    const {pathname, search} = location;
    const languageId = getLangIdByUrlPath(pathname);
    props.setLanguageId(languageId);
    props.appSetHtmlLangAttrValue(languageId);
    props.setAlternate(pathname, search);

    props.appSetCatalogState({isVisible: false});

    const hoc = getHoc(pathname)
    props.setHoc(hoc);

    if (hoc === 'CategoryPage') {
      const params = querystring.parse(`${search.substring(1)}`);
      props.setCategoryIdByPathname(window.location.pathname);
      let {page} = params;
      page = parseInt(page);
      page = isNaN(page) ? 1 : page;
      props.productsSetPage(page);
    } else if (hoc === 'ProductPage') {
      props.setProductIdByPathname(pathname);
    }
  });

  props.getCartInfo(props.sessionValue);
}
