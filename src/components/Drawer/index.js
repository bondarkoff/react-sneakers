import styles from './Drawer.module.scss'

function Drawer() {
    return (
        <div style={{display: "none"}} className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" /></h2>
                <div className={styles.items}>
                    <div className={styles.cartItem}>
                        <img className="mr-20" width={70} height={70} src="/img/sneakers/item-1.png" alt="Sneakers" />
                        <div className="mr-20">
                        <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                        </div>
                        <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
                    </div>
                    <div className={styles.cartItem}>
                        <img className="mr-20" width={70} height={70} src="/img/sneakers/item-3.png" alt="Sneakers" />
                        <div className="mr-20">
                        <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                        </div>
                        <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
                    </div>
                </div>

                <div className={styles.cartTotalBlock}>
                    <ul>
                        <li className="d-flex">
                            <span>Итого: </span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li className="d-flex">
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>
                    <button className={styles.greenButton}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                </div>
            </div>
        </div>
    );
}

export default Drawer