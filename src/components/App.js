import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import newApi from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupEdit from './PopupEdit';
import PopupAvatar from './PopupAvatar';
import PopupAdd from './PopupAdd';

function App() {
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCardsInfo] = React.useState([]);

    React.useEffect(() => {
        newApi.getUserInfo()
        .then((data) => {
            setCurrentUser(data)
        })

        .catch((err) => console.log(err))
    }, [])

    React.useEffect(() => {
        newApi.getInitialCards()
        .then((data) => {
            setCardsInfo(data);
        })

        .catch((err) => console.log(err))
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        newApi.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCardsInfo((state) => state.map((c) => c._id === card._id ? newCard : c))
        })

        .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        newApi.deleteCard(card._id).then(() => {
            setCardsInfo(cards.filter(c => c._id !== card._id))
        })

        .catch((err) => console.log(err))
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({ name: card.name, link: card.link });
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(data) {
        newApi.editProfile(data).then((newInfo) => {
            setCurrentUser(newInfo);
            closeAllPopups();
        })

        .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(url) {
        newApi.editAvatar(url).then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })

        .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(data) {
        newApi.addCard(data).then((newCard) => {
            setCardsInfo([newCard, ...cards]);
            closeAllPopups();
        })

        .catch((err) => console.log(err))
    }

    return (
<div>
  <CurrentUserContext.Provider value={currentUser}>    
    <Header />
    <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
    />
    <Footer />
    <PopupEdit isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
    <PopupAdd isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
    <PopupAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups} />
  </CurrentUserContext.Provider> 
</div>
  );
}

export default App;
