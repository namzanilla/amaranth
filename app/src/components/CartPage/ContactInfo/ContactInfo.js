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
            {getTranslate(props.languageId, 1)} *
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactName', props)}
              type="text"
            />
          </div>
        </div>
        <div>
          <div>
            Телефон *
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactPhone', props)}
              type="text"
            />
          </div>
        </div>
        <div>
          <div>
            {getTranslate(props.languageId, 2)} *
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactCity', props)}
              type="text"
            />
          </div>
        </div>
        <div>
          <div>
            E-mail
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactEmail', props)}
              type="text"
            />
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

function contactInfoOnChange(field, props) {
  return function (e) {
    props.setContactInfo(field, e.target.value);
  }
}
