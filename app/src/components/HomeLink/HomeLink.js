import React from 'react';
import Logotype from 'components/Logotype';
import {
  HomeLinkWrap,
} from './style';

export default (props) => {
  const {
    history,
    languageId,
    background,
  } = props;

  const homeLinkHref = languageId === 1 ? '/' : '/ru';

  return (
    <HomeLinkWrap
      href={homeLinkHref}
      onClick={homeLinkOnClick(history, homeLinkHref)}
    >
      <Logotype
        background={background}
      />
    </HomeLinkWrap>
  );
}

function homeLinkOnClick(history, homeLinkHref) {
  return function(e) {
    e.preventDefault();

    history.push({
      pathname: homeLinkHref,
      search: '',
    });
  }
}
