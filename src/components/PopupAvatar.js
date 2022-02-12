import React from 'react';
import PopupWithForm from "./PopupWithForm";


function PopupAvatar( {isOpen, onClose, onUpdateAvatar} ) {

    const link = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: link.current.value
        });
    };

    return (
        <PopupWithForm title="Обновить аватар" name="avatar__edit-form" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input ref={link} className="popup__input popup__input_type_avatar form__input" type="url" required placeholder="Обновите аватар" id="avatar-input" name="avatar" />
            <span className="popup__error popup__form-avatar-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default PopupAvatar;