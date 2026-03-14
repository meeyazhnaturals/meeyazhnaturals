import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('meeyazh_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('meeyazh_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, variant = null) => {
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.id === product.id && item.variant === variant);
            if (existingIndex !== -1) {
                const newCart = [...prevCart];
                newCart[existingIndex].quantity += 1;
                return newCart;
            }
            return [...prevCart, { ...product, variant, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, variant = null) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.variant === variant)));
    };

    const updateQuantity = (productId, quantity, variant = null) => {
        if (quantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            (item.id === productId && item.variant === variant) ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
