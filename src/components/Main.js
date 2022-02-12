import React from 'react';
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__edit-avatar" onClick={onEditAvatar}></div>
                    <button className="profile__photo" style={{ backgroundImage: `url(${currentUser.avatar})` }} src="#" alt="фотография Жака-Ив Кусто" type="button"></button>
                    <div className="profile__text">
                        <div className="profile__info-top">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button onClick={onEditProfile} className='button profile__edit-button' type="button" aria-label="кнопка редактирования профиля"></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} className="button profile__add-button" type="button" aria-label="кнопка добавления новой карточки"></button>
            </section>
            <section className="elements">
                <ul className="elements__items">
                    {cards.map(card => (
                        <Card key={card._id}
                            onCardClick={onCardClick}
                            card={card} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;