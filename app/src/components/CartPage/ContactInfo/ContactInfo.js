import React from 'react';
import {
  ContactInfoWrap,
  ContactInfoHeader,
} from './style';

export default (props) => {
  return (
    <ContactInfoWrap>
      <ContactInfoHeader>
        {getTranslate(props.languageId, 0)}
      </ContactInfoHeader>
      <div className="form">
        <div>
          <div>
            {getTranslate(props.languageId, 1)}
          </div>
          <div>
            <input type="text" />
          </div>
        </div>
        <div>
          <div>
            Телефон
          </div>
          <div>
            <input type="text" />
          </div>
        </div>
        <div>
          <div>
            {getTranslate(props.languageId, 2)}
          </div>
          <div>
            <input type="text" />
          </div>
        </div>
      </div>
    </ContactInfoWrap>
  );
}

function getTranslate(languageId, type) {
  if (type === 0) {
    return languageId === 1
      ? 'Контактна інформація'
      : 'Контактная информация';
  } else if (type === 1) {
    return languageId === 1
      ? 'Ім\'я'
      : 'Имя';
  } else if (type === 2) {
    return languageId === 1
      ? 'Місто'
      : 'Город';
  }
}
