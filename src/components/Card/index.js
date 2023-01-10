import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'

import AppContext from '../../context';

function Card({ id, onFavourite, imageUrl, title, price, onPlus, favourited = false, loading = false }) {

    const {isItemAdded} = React.useContext(AppContext)
    const [isFavourite, setIsFavourite] = React.useState(favourited);
    const obj = {id, parentId: id, imageUrl, title, price}

    const onCLickPlus = () => {
        onPlus(obj);   
    }
    
    const onClickFavourite = () => {
        onFavourite(obj);
        setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
            {
                loading ?      <ContentLoader 
                speed={2}
                width={200}
                height={215}
                viewBox="0 0 200 215"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="10" ry="10" width="175" height="91" /> 
                <rect x="0" y="108" rx="3" ry="3" width="175" height="15" /> 
                <rect x="0" y="133" rx="3" ry="3" width="93" height="15" /> 
                <rect x="0" y="175" rx="8" ry="8" width="80" height="24" /> 
                <rect x="140" y="172" rx="8" ry="8" width="32" height="32" />
              </ContentLoader> : <>
            {onFavourite && (<div className={styles.favourite} onClick={onClickFavourite}>
                <img src={isFavourite ? "img/heart-liked.svg" : "img/heart-unliked.png"} alt="Heart"/>
            </div>)}
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{price} грн.</b>
                </div>
            <button>
                {onPlus && (<img className={styles.plus} onClick={onCLickPlus} src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="Plus" />)}
            </button>
            </div>
              </>
            }

        </div>   
    );
}                 

export default Card