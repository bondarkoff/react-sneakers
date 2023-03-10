import React from 'react'
import axios from 'axios';

import { useCart } from '../../hooks/useCart';
import Info from '../Info';

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) =>  setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
    const {cartItems, setCartItems, totalPrice, totalTax, totalAll} = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderCompleted, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            // Костыль, проблемма в MockApi
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://63a71f697989ad3286ea25c4.mockapi.io/cart/' + item.id);
                await delay(1000)
            }

        } catch (error) {
            alert('Ошибка при создании заказа :(')
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина{' '} <img onClick={onClose} className={styles.removeBtn} src="img/btn-remove.svg" alt="Close" /></h2>
                   
                    {
                        items.length > 0 ? <div className='d-flex flex-column flex'>   
                        <div className={styles.items}>
                            {items.map((obj) => (
                                <div key={obj.id} className={styles.cartItem}>
                                    <div className="cartItemImg" style={{ backgroundImage: `url(${obj.imageUrl})` }}/>
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className={styles.removeBtn} src="img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>
                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li className="d-flex">
                                        <span>Итого: </span>
                                        <div></div>
                                        <b>{totalPrice} грн. </b>
                                    </li>
                                    <li className="d-flex">
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{totalTax} грн. </b>
                                    </li>
                                    <li className="d-flex">
                                        <span>К оплате: </span>
                                        <div></div>
                                        <b>{totalAll} грн.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                            </div>
                    </div> : <Info 
                                title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"} 
                                description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской службе доставки` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
                                image={isOrderCompleted ? "img/complete-order.png" : "img/empty-cart.png"} 
                            />
                    }
                </div>
            </div>
    );
}

export default Drawer