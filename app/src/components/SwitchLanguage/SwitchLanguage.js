import React from 'react';
import {
  Wrap,
} from './style';

export default (props) => {
  const {
    history,
    languageId,
    alternateUk,
    alternateRu,
  } = props;

  const propsRu = {
    href: alternateUk,
    onClick: (e) => {
      e.preventDefault();

      if (languageId === 1) {
        history.push('/ru');
      }
    },
  };

  const propsUk = {
    href: alternateRu,
    onClick: (e) => {
      e.preventDefault();

      if (languageId === 2) {
        history.push('/');
      }
    },
  };

  if (languageId === 1) {
    propsUk.className = 'active';
  } else {
    propsRu.className = 'active';
  }

  return (
    <Wrap>
      <a
        {...propsRu}
      >
        ru
      </a>
      &nbsp;|&nbsp;
      <a
        {...propsUk}
      >
        uk
      </a>
    </Wrap>
  );
}
