import React from 'react';
import styles from './Card.module.scss'

function Card({ onFavourite, imageUrl, title, price, onPlus }) {
    const [isAdded, setIsAdded] = React.useState(false);

    const onCLickPlus = () => {
        onPlus({imageUrl, title, price});
        setIsAdded(!isAdded);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favourite} onClick={onFavourite}>
                <img src="./img/heart-unliked.svg" alt="Unliked" />
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