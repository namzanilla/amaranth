import React from 'react';
import {BreadcrumbsWrap} from './style';

export default (props) => {
  const {list = []} = props;

  if (!list.length) return null;

  return (
    <BreadcrumbsWrap>
      {list.map((el) => {
        const {
          name,
          url,
        } = el;

        return (
          <a href={url}>
            {name}
          </a>
        );
      })}
    </BreadcrumbsWrap>
  );
}
