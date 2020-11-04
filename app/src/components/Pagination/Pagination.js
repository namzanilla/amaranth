import React from 'react';
import {PaginationWrap} from './style';
import {pagination} from 'helpers/simple-pagination';

export default (props) => {
  let {
    page: pageProp,
    limit,
    total,
  } = props;

  total = parseInt(total);
  if (isNaN(total)) return null;

  pageProp = parseInt(pageProp);
  if (isNaN(pageProp)) return null;

  const pages = Math.ceil(total / limit);

  if (pages < 2) return null;

  const links = pagination(pageProp, pages);

  if (!links.length) return null;

  const linksJSX = links.map((page, ix) => {
    const href = '...' === page
      ? null
      : page > 1
        ? `${props.url}?page=${page}`
        : props.url;

    const attrs = {
      href,
      onClick: onClickHandler(page, props.onClick),
    };

    if (pageProp === page) {
      attrs.className = 'active';
    }

    const childJSX = href ? (
      <a {...attrs}>
        {page}
      </a>
    ) : (
      <span>
        {page}
      </span>
    )

    return (
      <li key={ix}>
        {childJSX}
      </li>
    );
  });

  return (
    <PaginationWrap>
      <ul>
        {linksJSX}
      </ul>
    </PaginationWrap>
  );
}

const onClickHandler = (page, onClick) => (e) => {
  e.preventDefault();

  onClick(page);
}
