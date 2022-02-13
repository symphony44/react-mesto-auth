import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup';
import newApi from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupEdit from './PopupEdit';
import PopupAvatar from './PopupAvatar';
import PopupAdd from './PopupAdd';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import { register, authorize, getContent } from '../utils/Auth.js';

function App() {

    const history = useHistory();
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [userData, setUserData] = React.useState('');
    const [cards, setCardsInfo] = React.useState([]);
    
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);

    React.useEffect(() => {
        if (loggedIn) {
        newApi.getUserInfo()
        .then((data) => {
            setCurrentUser(data)
        })

        .catch((err) => console.log(err))
        }
    }, [loggedIn])

    React.useEffect(() => {
        if (loggedIn) {
        newApi.getInitialCards()
        .then((data) => {
            setCardsInfo(data);
        })

        .catch((err) => console.log(err))
        }
    }, [loggedIn]);

    React.useEffect(() => {
        tokenCheck();
      }, [loggedIn]);

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
        setIsInfoTooltipPopupOpen(false);
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

    function tokenCheck() {
        if (localStorage.getItem('jwt')) {
          const jwt = localStorage.getItem('jwt');
          getContent(jwt).then(res => {
            if (res) {
              setLoggedIn(true);
              setUserData(res.data.email);
              history.push('/');
            }
          })
            .catch(err => console.log(err));
        }
      };
    
      function handleLogin(email, password) {
        authorize(email, password).then(data => {
          if (data.token) {
            setLoggedIn(true);
            history.push('/');
          } else {
            setIsSuccessful(false);
            setIsInfoTooltipPopupOpen(true);
          }
        })
          .catch(err => {
            console.log(err)
            setIsSuccessful(false);
            setIsInfoTooltipPopupOpen(true);
          });
      }
    
      function handleRegister(email, password) {
        register(email, password).then(res => {
          if (res) {
            setIsSuccessful(true);
            setIsInfoTooltipPopupOpen(true);
            history.push('/signin');
          } else {
            setIsSuccessful(false);
            setIsInfoTooltipPopupOpen(true);
          }
        })
          .catch(err => {
            console.log(err);
            setIsSuccessful(false);
            setIsInfoTooltipPopupOpen(true);
          })
      }

    return (
<div>
  <CurrentUserContext.Provider value={currentUser}>    
    <Header userData={userData} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Switch>
      <ProtectedRoute   
        exact
        path="/"
        loggedIn={loggedIn}
        component={Main}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} />
      <Route path="/signin">
        <Login handleLogin={handleLogin} />
      </Route>
      <Route path="/signup">
        <Register handleRegister={handleRegister} />
      </Route>
      <Route path="/">
        {loggedIn ? (<Redirect to="/" />) : (<Redirect to="/signin" />)}
      </Route>  
    </Switch>
    {loggedIn ? <Footer /> : ""}
    <PopupEdit isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
    <PopupAdd isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
    <PopupAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups} />
    <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccessful={isSuccessful} />    
  </CurrentUserContext.Provider> 
</div>
  );
}

export default App;
