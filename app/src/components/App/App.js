import React, {useEffect} from 'react';
import Style from './style';
import {Helmet} from 'react-helmet';
import {getLangIdByUrlPath} from 'helpers/language';
import {getHoc} from 'helpers/hoc';
import HomePage from 'components/HomePage';
import CategoriesPage from 'components/CategoriesPage';
import CategoryPage from 'components/CategoryPage';
import CartPage from 'components/CartPage';
import ProductPage from 'components/ProductPage';
import NotFoundPage from 'components/NotFoundPage';
const querystring = require('querystring');
import Header from 'components/Header';
import SubHeader from 'components/SubHeader';

const components = {
  HomePage,
  CategoriesPage,
  CategoryPage,
  CartPage,
  ProductPage,
  NotFoundPage,
};

export default (props) => {
  const Component = components[props.hoc];

  useEffect(() => {
    props.history.listen(({location}) => {
      const {pathname, search} = location;
      const languageId = getLangIdByUrlPath(pathname);
      props.setLanguageId(languageId);
      props.setAlternate(pathname, search);

      const hoc = getHoc(pathname)
      props.setHoc(hoc);

      if (hoc === 'CategoryPage') {
        const params = querystring.parse(`${search.substring(1)}`);
        let {page} = params;
        page = parseInt(page);
        page = isNaN(page) ? 1 : page;
        props.productsSetPage(page);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <link rel="alternate" href={props.alternateUk} hrefLang="uk-UA" />
        <link rel="alternate" href={props.alternateRu} hrefLang="ru-UA" />
      </Helmet>
      <Style />
      <Header history={props.history} />
      <SubHeader history={props.history} />
      <Component
        {...props}
      />
    </>
  );
};
