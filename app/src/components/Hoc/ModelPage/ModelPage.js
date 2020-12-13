import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {ModelPageWrap} from './style';
import H1 from 'components/H1';

export default (props) => {
  const [loading, setLoading] = useState(!props.ssr);
  const [title, setTitle] = useState(props.ssr ? props.title : getLoadingText(props.languageId));
  const [h1, setH1] = useState(props.ssr ? props.h1 : getLoadingText(props.languageId));
  const [languageId, setLanguageId] = useState(props.languageId);
  const [modelId, setModelId] = useState(props.modelId);

  useEffect(() => {
    if (props.ssr) {
      props.appSetSSR(false);
    } else {
      props.setModelIdByPathname(window.location.pathname).then((modelId) => {
        fetchModelInfo(props, modelId, setLoading, setTitle, setH1);
      });
    }

    return () => {
      props.setModelInitialState();
    }
  }, []);

  useEffect(() => {
    if (modelId !== props.modelId) {
      setModelId(props.modelId);
      fetchModelInfo(props, props.modelId, setLoading, setTitle, setH1);
    }
  }, [props.modelId]);

  useEffect(() => {
    if (languageId !== props.languageId) {
      setLanguageId(props.languageId);
      fetchModelInfo(props, props.modelId, setLoading, setTitle, setH1);
    }
  }, [props.languageId]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ModelPageWrap>
        <H1 child={h1} />
      </ModelPageWrap>
    </>
  );
}

function getLoadingText(languageId) {
  return languageId === 1
    ? 'Завантаження...'
    : 'Загрузка...';
}

function fetchModelInfo(props, modelId, setLoading, setTitle, setH1) {
  setLoading(true);
  setTitle(getLoadingText(props.languageId));
  setH1(getLoadingText(props.languageId));

  props.fetchModelById(modelId).then((data) => {
    setLoading(false);

    const {
      info: {
        title,
        h1,
      } = {},
    } = data;

    setTitle(title);
    setH1(h1);
  });
}
