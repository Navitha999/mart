import { createContext, useState } from "react"
import { useEffect } from "react";
export const CartContext = createContext();


export const CartItem = ({ children }) => {
    const [cart, setCart] = useState([])
    const addingCart = (product) => {
        setCart(prevItem => {
            const isExist = prevItem.find(item => item.id === product.id)
            if (isExist) {
                return prevItem.map(item => item.id === product.id ?
                    { ...item, quantity: item.quantity + 1 } : item
                )   
            }
            return [...prevItem, { ...product, quantity: 1 }]
        })
    }

    const increment = (id) => {
        setCart(prevItem =>
            prevItem.map(each => each.id === id ? { ...each, quantity: each.quantity + 1 } : each)

        )
    }
    const decrement = (id) => {
        setCart(prevItem =>
            prevItem.map(each => each.id === id ? { ...each, quantity: each.quantity - 1 } : each)
                .filter(item => item.quantity > 0)

        )
    }
    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };


    useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart); // Changed from setCartItem
}, []);

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Changed from cartItem
}, [cart]);
    return (
        <CartContext.Provider value={{ cart, addingCart, increment, decrement, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}
