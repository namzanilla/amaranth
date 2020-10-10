import React from 'react';
import {
  SwitchLanguageWrap,
} from './style';

export default (props) => {
  const {
    history,
    languageId,
    alternateUk,
    alternateRu,
    background,
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
    <SwitchLanguageWrap
      background={background}
    >
      <a
        {...propsUk}
      >
        укр
      </a>
      <span>|</span>
      <a
        {...propsRu}
      >
        рус
      </a>
    </SwitchLanguageWrap>
  );
}
