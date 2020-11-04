import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import H1 from 'components/H1';
import Products from 'components/Products';
import Pagination from 'components/Pagination';

export default (props) => {
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [languageId, setLanguageId] = useState(props.languageId);
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    if (!props.ssr) {
      props.setCategoryIdByPathname(window.location.pathname);
    } else {
      props.setSSR(false);
    }

    return () => {
      props.unsetCategoryId();
    }
  }, []);
  
  useEffect(() => {
    if (props.categoryId !== categoryId) {
      setCategoryId(props.categoryId);
      props.fetchCategoryInfo(props.categoryId, languageId);
      props.productsFetch();
    }
  }, [props.categoryId]);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLanguageId(props.languageId);
      props.fetchCategoryInfo(categoryId, props.languageId);
      props.productsFetch();
    }
  }, [props.languageId]);

  useEffect(() => {
    if (props.page !== page) {
      setPage(props.page);
      props.productsFetch();
    }
  }, [props.page]);

  return (
    <>
      <Helmet>
        <title>{props.h1}</title>
      </Helmet>
      <H1 child={props.h1} />
      <Products
        margin="0 auto 20px auto"
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
};

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

  props.productsSetPage(page);
}
