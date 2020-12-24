import React, {useState, useEffect} from 'react';

// style
import {
  AggsWrap,
  AggItemsWrap,
  AggItemsHeader,
  AggItems,
  AggItem,
} from './style';

// const
import {
  AGG_TYPE_7,
  AGG_TYPE_3_PIPE_7,
} from 'const/model';

export default(props) => {
  if (!props.type) return null;

  const [paramFirst, setParamFirst] = useState(props.paramFirst);
  
  useEffect(() => {
    if (paramFirst !== props.paramFirst) {
      setParamFirst(props.paramFirst);
      props.fetch_AGG_TYPE_3_PIPE_7_SECOND(props.modelId, props.paramFirst);
    }
  }, [props.paramFirst]);
  
  let contentJSX;

  if (AGG_TYPE_7 === props.type) {
    contentJSX = props.first.length ? (
      <AggItems>
        {props.first.map((el) => {
          return (
            <AggItem
              key={el.productId}
              href={getProductPageHref(el.productId, props.languageId)}
              onClick={productPageLinkOnClick(props.history, el.productId, props.languageId)}
            >
              {el.name} шт.<br />
              {el.productPrice} грн
            </AggItem>
          );
        })}
      </AggItems>
    ) : null;
  } else if (AGG_TYPE_3_PIPE_7 === props.type) {
    const secondJSX = props.second.length ? (
      <AggItems>
        {props.second.map((el) => {
          return (
            <AggItem
              key={el.id}
              href={getProductPageHref(el.id, props.languageId)}
              onClick={productPageLinkOnClick(props.history, el.id, props.languageId)}
            >
              {el.name}
            </AggItem>
          );
        })}
      </AggItems>
    ) : null;

    contentJSX = (
      <AggItemsWrap>
        <AggItemsHeader>
          Выберите вкус
        </AggItemsHeader>
        <AggItems>
          {props.first.map((el) => {
            return (
              <AggItem
                key={el.id}
                href={getHref(props.modelId, props.languageId, el.id)}
                onClick={itemOnClick(props.history, props.modelId, props.languageId, el.id)}
                isActive={props.paramFirst === el.id}
              >
                {el.name}
              </AggItem>
            );
          })}
        </AggItems>
        {secondJSX}
      </AggItemsWrap>
    );
  }

  return contentJSX ? (
    <AggsWrap>
      {contentJSX}
    </AggsWrap>
  ) : null;
}

function itemOnClick(history, modelId, languageId, id) {
  return function(e) {
    e.preventDefault();

    history.push({
      pathname: getHref(modelId, languageId, id),
      search: '',
    })
  }
}

function productPageLinkOnClick(history, productId, languageId) {
  return function(e) {
    e.preventDefault();

    history.push({
      pathname: getProductPageHref(productId, languageId),
      search: '',
    })
  }
}

function getHref(modelId, languageId, id) {
  let href = `/m${modelId}/${id}`;

  if (languageId === 2) {
    href  = `/ru${href}`;
  }

  return href;
}

function getProductPageHref(productId, languageId) {
  let href = `/p${productId}`;

  if (languageId === 2) {
    href  = `/ru${href}`;
  }

  return href;
}

