import React from 'react';

import {
  Image,
  CategoriesWrap,
  CategoryItem,
} from './style';

export default (props) => {
  if (!props.list.length) return null;

  const listJSX = props.list.map((el) => {
    const {
      id,
      name,
    } = el;

    const imageAttrs = {};

    if (id === 8) {
      imageAttrs.left = '-100%';
    } else {
      imageAttrs.left = 0;
    }

    return (
      <CategoryItem
        key={id}
        href={getCategoryItemHref(id, props.languageId)}
        onClick={categoryItemOnClick(getCategoryItemHref(id, props.languageId), props.history)}
      >
        <Image {...imageAttrs}>
          <img src={`${props.hostStatic}/c.png`} alt={name} />
        </Image>
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
