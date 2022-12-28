import React from 'react';
import styles from './Card.module.scss'

function Card({ id, onFavourite, imageUrl, title, price, onPlus, favourited = false }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(favourited);

    const onCLickPlus = () => {
        onPlus({imageUrl, title, price});
        setIsAdded(!isAdded);
    }
    
    const onClickFavourite = () => {
        onFavourite({id, imageUrl, title, price});
        setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favourite} onClick={onClickFavourite}>
                <img src={isFavourite ? "img/heart-liked.svg" : "img/heart-unliked.png"} alt="Heart"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{price} руб.</b>
                </div>
            <button>
                <img className={styles.plus} onClick={onCLickPlus} src={isAdded ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="Plus" />
            </button>
            </div>
        </div>   
    );
}                 

export default Card