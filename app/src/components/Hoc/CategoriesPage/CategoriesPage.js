import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import Categories from 'components/Categories';
import H1 from 'components/H1';
import {getLoadingText} from 'helpers/language';

export default (props) => {
  const [loading, setLoading] = useState(!props.ssr);
  const [languageId, setLanguageId] = useState(props.languageId);

  useEffect(() => {
    if (props.ssr) {
      props.appSetSSR(false);
    } else {
      fetchCategoryList(props, setLoading);
    }
  }, []);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLoading(true);
      setLanguageId(props.languageId);

      fetchCategoryList(props, setLoading);
    }
  }, [props.languageId]);

  let contentJSX = null;

  if (!loading) {
    contentJSX = (
      <Categories history={props.history} />
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTitle(props.languageId, loading)}</title>
      </Helmet>
      <H1
        child={getH1(props.languageId, loading)}
      />
      {contentJSX}
    </>
  );
};

function fetchCategoryList(props, setLoading) {
  props.fetchCategoryList().then(() => {
    setLoading(false);
  }).catch(() => {
    setLoading(false);
  });
}

function getTitle(languageId, loading) {
  if (loading) {
    return getLoadingText(languageId);
  }

  return languageId === 1
    ? 'Каталог товарів'
    : 'Каталог товаров';
}

function getH1(languageId, loading) {
  return getTitle(languageId, loading);
}
