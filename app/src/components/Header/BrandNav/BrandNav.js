import React, {useEffect, useState} from 'react';
import {
  Wrap,
} from './style';

export default (props) => {
  if (!props.brands.length) {
    return null;
  }

  const [languageId, setLanguageId] = useState(props.languageId);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLanguageId(props.languageId);
      props.fetchCategoryBrandTree(props.languageId);
    }
  }, [props.languageId]);

  const href = props.languageId === 1 ? `/c${props.id}` : `/ru/c${props.id}`;

  return (
    <Wrap>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          props.toggleBrandNavVisibility();
        }}
      >
        {props.name}
      </a>
    </Wrap>
  );
}
