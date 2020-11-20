import React from 'react';
import {
  ContactInfoWrap,
  ContactInfoHeader,
} from './style';

export default (props) => {
  return (
    <ContactInfoWrap>
      <ContactInfoHeader>
        {getHeaderText(props.languageId)}
      </ContactInfoHeader>
      <div className="form">
        <div>
          <div>
            Имя
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
            Город
          </div>
          <div>
            <input type="text" />
          </div>
        </div>
      </div>
    </ContactInfoWrap>
  );
}

function getHeaderText(languageId) {
  return languageId === 1
  ? 'Контактна інформація'
  : 'Контактная информация';
}

