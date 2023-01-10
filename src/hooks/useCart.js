import React from 'react'

import AppContext from '../context'

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)
    const totalTax = Math.round(totalPrice / 100 * 5)
    const totalAll = (totalPrice + totalTax)
    
    return { cartItems, setCartItems, totalPrice, totalTax, totalAll }
}
