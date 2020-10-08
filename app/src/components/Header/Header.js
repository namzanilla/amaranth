import React from 'react';
import SwitchLanguage from 'components/SwitchLanguage';
import Logotype from 'components/Logotype';
import BrandNav from './BrandNav';
import {
  Wrap,
} from './style';

export default (props) => {
  const {
    languageId,
    history,
  } = props;

  const homeLinkHref = languageId === 1 ? '/' : '/ru';

  return (
    <Wrap>
      <div>
        <a
          href={homeLinkHref}
          onClick={(e) => {
            e.preventDefault();

            history.push({
              pathname: homeLinkHref,
              search: '',
            })
          }}
        >
          <Logotype />
        </a>
        <BrandNav />
      </div>
      <SwitchLanguage
        history={history}
      />
    </Wrap>
  );
};
