"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUser } from './user-context';

export interface CartItem {
    id: string;
    title: string;
    price: string;
    quantity: number;
    description: string;
    link: string;
}

interface CartContextType {
    items: CartItem[];
    itemsLength: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (title: string) => void;
    incrementQuantity: (title: string) => void;
    decrementQuantity: (title: string) => void;
    isItemInCart?: (title: string) => boolean;
    openSheet: boolean;
    setOpenSheet: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [openSheet, setOpenSheet] = useState(false);

    const addToCart = async (item: CartItem) => {
        if (user) {
            if (!cartItems.some((cartItem) => cartItem.title === item.title)) {
                const newItem = { ...item, quantity: 1 };
                setCartItems((prevCartItems) => [...prevCartItems, newItem]);
                setOpenSheet(true);
                toast.success('Adaugat cu succes in cos ❤️‍🔥', {
                    position: "bottom-left",
                    style: {
                        background: "black",
                        color: "white",
                        border: "none"
                    }
                });

                try {
                    await fetch('/api/user/cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user.id, item: newItem }),
                    });
                } catch (error) {
                    console.error('Failed to add item to cart', error);
                }
            } else {
                toast.warning('Ai adaugat deja acest produs in cos!', {
                    position: "bottom-left",
                    style: {
                        background: "orange",
                        color: "white",
                        border: "none"
                    }
                });
            }
        } else {
            toast.warning('Trebuie sa fii autentificat pentru a putea adauga in cos!');
        }
    };

    const removeFromCart = async (title: string) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.title !== title));

        try {
            await fetch('/api/user/cart/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.id, title }),
            });
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    const incrementQuantity = async (title: string) => {
        const updatedItems = cartItems.map((item) =>
            item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);

        const updatedItem = updatedItems.find((item) => item.title === title);
        if (updatedItem) {
            try {
                await fetch('/api/user/cart/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user?.id, item: updatedItem }),
                });
            } catch (error) {
                console.error('Failed to update item quantity', error);
            }
        }
    };

    const decrementQuantity = async (title: string) => {
        const updatedItems = cartItems.map((item) =>
            item.title === title && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems);

        const updatedItem = updatedItems.find((item) => item.title === title);
        if (updatedItem) {
            try {
                await fetch('/api/user/cart/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user?.id, item: updatedItem }),
                });
            } catch (error) {
                console.error('Failed to update item quantity', error);
            }
        }
    };

    const isItemAdded = (title: string): boolean => {
        return cartItems.some((item) => item.title === title);
    };

    const value: CartContextType = {
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        items: cartItems,
        itemsLength: cartItems?.length ?? 0,
        isItemInCart: isItemAdded,
        openSheet,
        setOpenSheet
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
