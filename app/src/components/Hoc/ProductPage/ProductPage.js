import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {ProductWrap} from './style';
import H1 from 'components/H1';
import * as productHelper from 'helpers/product';

export default (props) => {
  const [productId, setProductId] = useState(props.productId);
  const [h1, setH1] = useState(productHelper.productMeta2H1(props.productMeta));
  const [title, setTitle] = useState(productHelper.productMeta2Title(props.productMeta));

  useEffect(() => {
    if (props.ssr) {
      props.appSetSSR(false);
    } else {
      if (props.productId) {
        props.fetchProductById(props.productId).then(({meta = {}}) => {
          setH1(productHelper.productMeta2H1(meta));
          setTitle(productHelper.productMeta2Title(meta));
        });
      }
    }

    return () => {
      props.setProductInitialState();
    }
  }, []);

  useEffect(() => {
    if (props.productId !== productId) {
      setProductId(props.productId);
      props.fetchProductById(props.productId).then(({meta = {}}) => {
        setH1(productHelper.productMeta2H1(meta));
        setTitle(productHelper.productMeta2Title(meta));
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
