import React from 'react';
import {Helmet} from 'react-helmet';
import {NotFoundPageWrap} from './style';
import H1 from 'components/H1';

export default (props) => {
  let h1Text;

  if (1 === props.languageId) {
    h1Text = 'На жаль, запитувана Вами сторінка не існує';
  } else if (2 === props.languageId) {
    h1Text = 'К сожалению, запрашиваемая Вами страница не существует';
  }

  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <NotFoundPageWrap>
        <H1 child={h1Text} />
      </NotFoundPageWrap>
    </>
  );
};
