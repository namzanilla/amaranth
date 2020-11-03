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
console.log(getHref(languageId, alternateUk, alternateRu));
  return (
    <SwitchLanguageWrap
      background={background}
      href={getHref(languageId, alternateUk, alternateRu)}
      onClick={onClickHandler(languageId, alternateUk, alternateRu, history)}
    >
      {getText(languageId)}
    </SwitchLanguageWrap>
  );
}

const getText = (languageId) => {
  if (languageId === 1) {
    return 'рус';
  } else if (languageId === 2) {
    return 'укр';
  }
};

const getHref = (languageId, alternateUk, alternateRu) => {
  console.log(languageId);
  console.log(alternateRu);
  if (languageId === 1) {
    return alternateRu;
  } else if (languageId === 2) {
    return alternateUk;
  }
};

const onClickHandler = (languageId, alternateUk, alternateRu, history) => (e) => {
  e.preventDefault();

  if (languageId === 1) {
    history.push(alternateRu);
  } else if (languageId === 2) {
    history.push(alternateUk);
  }
};
