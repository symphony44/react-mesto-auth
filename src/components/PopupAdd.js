import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupAdd({ isOpen, onClose, onAddPlace }) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeTitle(evt) {
        setTitle(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: title,
            link: link
        });
    }

    React.useEffect(() => {
        setTitle('');
        setLink('');
      }, [isOpen]);
     
    return (
        <PopupWithForm title="Новое место" name="place__add-form" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_place form__input" value={title} required placeholder="Название" id="place-input" 
            name="name" type="text" minLength="2" maxLength="30" onChange={handleChangeTitle}/>
            <span className="popup__error popup__form-place-error place-input-error"></span>
            <input className="popup__input popup__input_type_link form__input" value={link} required placeholder="Ссылка на картинку" id="link-input" 
            name="link" type="url" onChange={handleChangeLink}/>
            <span className="popup__error popup__form-link-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default PopupAdd;