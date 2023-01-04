import React from 'react'
import AppContext from '../context'

import styles from './Drawer/Drawer.module.scss'

const Info = ({image, title, description}) => {
    const {setCartOpened} = React.useContext(AppContext)
    return (
    <div className={styles.cartEmpty}>
        <img className='mb-20' width={120} src={image} alt="Empty-Cart" />
        <h2>{title}</h2>
        <p className="opacity-6">{description}</p>
        <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
            <img className={styles.rotate} src="img/arrow.svg" alt="Arrow" />Вернуться назад
        </button>
    </div>
  )
}

export default Info
