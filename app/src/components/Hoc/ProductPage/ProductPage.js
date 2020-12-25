import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {ProductWrap} from './style';
import H1 from 'components/H1';
import * as at from 'store/actionTypes';
import {getLoadingText} from 'helpers/language';

export default (props) => {
  const [loading, setLoading] = useState(!props.ssr);
  const [productId, setProductId] = useState(props.productId);
  const [languageId, setLanguageId] = useState(props.languageId);
  const [h1, setH1] = useState(props.ssr
    ? props.productH1 : getLoadingText(props.languageId));

  const [title, setTitle] = useState(props.ssr
    ? props.productTitle ? props.productTitle : props.productH1
    : getLoadingText(props.languageId));

  useEffect(() => {
    if (props.ssr) {
      props.appSetSSR(false);
    } else {
      if (props.productId) {
        props.fetchProductById(props.productId).then((result) => {
          if (at.PRODUCT_FETCH_BY_ID_FAILURE === result) {
            // @TODO failure page, log report
            console.log(at.PRODUCT_FETCH_BY_ID_FAILURE);
          }

          setLoading(false);
        });
      }
    }

    return () => {
      props.setProductInitialState();
    }
  }, []);

  useEffect(() => {
    if (props.languageId !== languageId) {
      setLanguageId(props.languageId);
      setLoading(true);

      props.fetchProductById(props.productId).then((result) => {
        if (at.PRODUCT_FETCH_BY_ID_FAILURE === result) {
          // @TODO failure page, log report
          console.log(at.PRODUCT_FETCH_BY_ID_FAILURE);
        }

        setLoading(false);
      });
    }
  }, [props.languageId]);

  useEffect(() => {
    if (loading) {
      setH1(getLoadingText(props.languageId));
      setTitle(getLoadingText(props.languageId));
    } else {
      setH1(props.productH1);
      setTitle(props.productTitle ? props.productTitle : props.productH1);
    }
  }, [loading]);

  useEffect(() => {
    if (props.productId !== productId) {
      setProductId(props.productId);
      setLoading(true);

      props.fetchProductById(props.productId).then((result) => {
        if (at.PRODUCT_FETCH_BY_ID_FAILURE === result) {
          // @TODO failure page, log report
          console.log(at.PRODUCT_FETCH_BY_ID_FAILURE);
        }

        setLoading(false);
      });

    }
  }, [props.productId]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <H1 child={h1} />
      <ProductWrap>

      </ProductWrap>
    </>
  );
}
