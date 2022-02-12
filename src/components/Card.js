import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
      
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeCliсk() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__item">
            <button className={`button "elements__delete-button" ${isOwn ? "elements__delete-button_active" : "elements__delete-button_hidden"}`} 
            type="button" aria-label="кнопка удаления карточки" onClick={handleDeleteClick}></button>
            <img className="elements__photo" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="elements__description">
                <h2 className="elements__name">{card.name}</h2>
                <div className="elements__like-container">
                    <button className={`button elements__like-button ${isLiked && "elements__like-button_active"}`} 
                        type="button" aria-label="кнопка лайка" onClick={handleLikeCliсk}></button>
                    <p className="elements__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;