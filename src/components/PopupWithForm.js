function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h2 className="popup__container-title">{title}</h2>
                <form className="popup__form form" id="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button className="button popup__save-button form__submit" id="popup__submit-button" type="submit" aria-label="кнопка сохранения">Сохранить</button>
                </form>
                <button onClick={onClose} className="button popup__close-button popup__close-button" type="button" aria-label="кнопка закрытия"></button>
            </div>
        </div>
    )
}

export default PopupWithForm;