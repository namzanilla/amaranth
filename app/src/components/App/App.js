import React, {useEffect} from 'react';
import Style from './style';
import {Helmet} from 'react-helmet';
import {getLangIdByUrlPath} from 'helpers/language';
import {getHoc} from 'helpers/hoc';
import HomePage from 'components/HomePage';
import CategoriesPage from 'components/CategoriesPage';
import CategoryPage from 'components/CategoryPage';
import CartPage from 'components/CartPage';
import NotFoundPage from 'components/NotFoundPage';

import Header from 'components/Header';
import SubHeader from 'components/SubHeader';

const components = {
  HomePage,
  CategoriesPage,
  CategoryPage,
  CartPage,
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

      getHoc({
        pathname,
        dispatch: props.dispatch,
        languageId,
      }).then((hoc) => {
        props.setHoc(hoc);
      });
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
