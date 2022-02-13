import React from 'react';
import successIcon from '../images/success__icon.svg';
import failIcon from '../images/fail__icon.svg';

function InfoTooltip({ isOpen, isSuccessful, onClose }) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__icon" src={isSuccessful ? successIcon : failIcon} alt='#' />
        <h2 className="popup__title-auth">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button className="popup__close-button" onClick={onClose} type="button" aria-label="Кнопка закрыть"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;