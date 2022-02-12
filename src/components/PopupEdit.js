import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function PopupEdit({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
  });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="profile__edit-form" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_name form__input" required placeholder="Имя" id="name-input" 
            name="name" type="text" minLength="2" maxLength="40" onChange={handleChangeName} value={name || ''}/>
            <span className="popup__error popup__form-name-error name-input-error"></span>
            <input className="popup__input popup__input_type_description form__input" required placeholder="Занятие" id="description-input" 
            name="about" type="text" minLength="2" maxLength="200" onChange={handleChangeDescription} value={description || ''}/>
            <span className="popup__error popup__form-description-error description-input-error"></span>
        </PopupWithForm>
    )
}

export default PopupEdit;