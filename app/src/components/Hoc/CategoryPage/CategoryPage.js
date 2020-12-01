import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import H1 from 'components/H1';
import Products from 'components/Products';
import Pagination from 'components/Pagination';

export default (props) => {
  const [loading, setLoading] = useState(!props.ssr);
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [languageId, setLanguageId] = useState(props.languageId);
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    if (props.ssr) {
      props.setSSR(false);
    } else {
      props.setCategoryIdByPathname(window.location.pathname);
    }

    return () => {
      props.unsetCategoryId();
    }
  }, []);
  
  useEffect(() => {
    if (props.categoryId !== categoryId) {
      setCategoryId(props.categoryId);
      setLoading(true);

      props.fetchCategoryInfo(props.categoryId, languageId)
        .then(onFetchCategoryInfo(props, setLoading))
        .catch(() => {
          setLoading(false);
        });
    }
  }, [props.categoryId]);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLanguageId(props.languageId);
      setLoading(true);

      props.fetchCategoryInfo(categoryId, props.languageId)
        .then(onFetchCategoryInfo(props, setLoading))
        .catch(() => {
          setLoading(false);
        });
    }
  }, [props.languageId]);

  useEffect(() => {
    if (props.page !== page) {
      setPage(props.page);
      setLoading(true);

      props.productsFetch().then(() => {
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [props.page]);

  let contentJSX = null;

  if (!loading) {
    contentJSX = (
      <>
        <Products
          margin="0 auto 20px auto"
          history={props.history}
        />
        <Pagination
          url={getPaginationUrl(props.languageId, props.categoryId)}
          total={props.total}
          limit={props.limit}
          page={props.page}
          onClick={paginationOnClick(props)}
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTitle(languageId, loading, props.title)}</title>
      </Helmet>
      <H1 child={getH1(languageId, loading, props.h1)} />
      {contentJSX}
    </>
  );
};

function getTitle(languageId, loading, title) {
  if (loading) {
    return languageId === 1
      ? 'Завантаження...'
      : 'Загрузка...';
  }

  return title;
}

function getH1(languageId, loading, h1) {
  return getTitle(languageId, loading, h1);
}

function onFetchCategoryInfo(props, setLoading) {
  return async function(result) {
    if (result !== undefined) {
      try {
        await props.productsFetch();

        setLoading(false);
      } catch (e) {
        console.log(e);

        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }
}

const getPaginationUrl = (languageId, categoryId) => {
  let url = `/c/${categoryId}`;

  if (languageId === 2) {
    url = `/ru${url}`;
  }

  return url;
}

const paginationOnClick = (props) => (page) => {
  props.history.push({
    pathname: getPaginationUrl(props.languageId, props.categoryId),
    search: page > 1 ? `?page=${page}` : '',
  });
}
