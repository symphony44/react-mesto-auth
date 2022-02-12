function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup-photo ${card.name && "popup_opened"}`}>
            <div className="popup__container popup-photo__container">
                <button className="button popup-photo__close-button popup__close-button" type="button" onClick={onClose}></button>
                <figure className="popup-photo__figure">
                    <img className="popup-photo__photo" src={card.link} alt={card.name} />
                    <figcaption className="popup-photo__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;