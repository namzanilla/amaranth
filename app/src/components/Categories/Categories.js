import React, {useState, useEffect} from 'react';

import {
  Image,
  CategoriesWrap,
  CategoryItem,
} from './style';

export default (props) => {
  const [languageId, setLanguageId] = useState(props.languageId);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLanguageId(props.languageId);

      if (!props.list.length) {
        props.fetchCategoryList(props.languageId);
      }
    }
  }, [props.languageId])

  useEffect(() => {
    if (!props.list.length) {
      props.fetchCategoryList(languageId);
    }
  }, [])

  const listJSX = props.list.map((el) => {
    const {
      id,
      name,
    } = el;

    return (
      <CategoryItem
        key={id}
        href={getCategoryItemHref(id, languageId)}
        onClick={categoryItemOnClick(getCategoryItemHref(id, languageId), props.history)}
      >
        <Image />
        <span>
          {name}
        </span>
      </CategoryItem>
    );
  });

  return (
    <CategoriesWrap>
      {listJSX}
    </CategoriesWrap>
  );
}

const getCategoryItemHref = (id, languageId) => {
  return languageId === 1 ? `/c/${id}` : `/ru/c/${id}`;
}

const categoryItemOnClick = (href, history) => (e) => {
  e.preventDefault();

  history.push(href);
}
