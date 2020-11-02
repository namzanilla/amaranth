import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import H1 from 'components/H1';

export default (props) => {
  const [languageId, setLanguageId] = useState(props.languageId);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLanguageId(languageId);
    }
  }, [props.languageId])

  return (
    <>
      <Helmet>
        <title>category title</title>
      </Helmet>
      <H1 child={props.h1} />
    </>
  );
};
