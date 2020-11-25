import React from 'react';
import {
  ContactInfoWrap,
  ContactInfoHeader,
} from './style';
/*
* @todo phone number validator
* */
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
              placeholder={getTranslate(props.languageId, 5)}
            />
          </div>
          <div>
            Телефон *
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactPhone', props)}
              type="text"
              placeholder="+380_________"
            />
          </div>
          <div>
            {getTranslate(props.languageId, 2)} *
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactCity', props)}
              type="text"
              placeholder={getTranslate(props.languageId, 4)}
            />
          </div>
          <div>
            E-mail
          </div>
          <div>
            <input
              onChange={contactInfoOnChange('contactEmail', props)}
              type="text"
              placeholder={getTranslate(props.languageId, 3)}
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
  } else if (type === 3) {
    return languageId === 1
      ? 'Вкажіть Email для відстеження статусу замовлення'
      : 'Укажите Email для отслеживания статуса заказа';
  } else if (type === 4) {
    return languageId === 1
      ? 'Київ'
      : 'Киев';
  } else if (type === 5) {
    return languageId === 1
      ? 'Петренко Сергій Сергійович'
      : 'Петренко Сергей Сергеевич';
  }
}

function contactInfoOnChange(field, props) {
  return function (e) {
    props.setContactInfo(field, e.target.value);
  }
}
