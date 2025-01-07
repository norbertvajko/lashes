"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUser } from './user-context';

export interface FavoriteItem {
    id: string;
    title: string;
    price: string;
    quantity: number;
    description: string;
    link: string;
}

interface FavoritesContextType {
    items: FavoriteItem[];
    itemsLength: number;
    addToFavorites: (item: FavoriteItem) => void;
    removeFromFavorites: (title: string) => void;
    isItemInFavorites?: (title: string) => boolean;
    resetFavItems: () => void;
    openSheet: boolean;
    setOpenSheet: (open: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [openSheet, setOpenSheet] = useState(false);
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        const fetchFavoriteItems = async () => {
            if (user) {
                console.log(user);
                try {
                    const response = await fetch(`/api/user/favorites/get/${user.id}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch favorite items (${response.status} ${response.statusText})`);
                    }

                    const data = await response.json();
                    setFavoriteItems(data.favoriteItems);
                } catch (error) {
                    console.error('Failed to fetch favorite items', error);
                }
            }
        };

        fetchFavoriteItems();
    }, [user]);

    const addToFavorites = async (item: FavoriteItem) => {
        if (user) {
            if (!favoriteItems.some((favoriteItem) => favoriteItem.title === item.title)) {
                const newItem = { ...item };
                setFavoriteItems((prevFavoriteItems) => [...prevFavoriteItems, newItem]);
                setOpenSheet(true);
                toast.success('Adaugat cu succes in lista ta de favorite ❤️‍🔥', {
                    position: "bottom-left",
                    style: {
                        background: "black",
                        color: "white",
                        border: "none"
                    }
                });

                try {
                    await fetch('/api/user/favorites/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user.id, item: newItem }),
                    });
                } catch (error) {
                    console.error('Failed to add item to favorites', error);
                }
            } else {
                toast.warning('Ai adaugat deja acest produs la favorite!', {
                    position: "bottom-left",
                    style: {
                        background: "orange",
                        color: "white",
                        border: "none"
                    }
                });
            }
        } else {
            toast.warning('Trebuie sa fii autentificat pentru a putea adauga la favorite!');
        }
    };

    const removeFromFavorites = async (title: string) => {
        setFavoriteItems((prevFavItems) => prevFavItems.filter((item) => item.title !== title));

        try {
            await fetch('/api/user/favorites/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.id, title }),
            });
        } catch (error) {
            console.error('Failed to remove item from favorites', error);
        }
    };

    const resetFavItems = () => {
        if (!user) {
            setFavoriteItems([]);
        }
    };

    useEffect(() => {
        resetFavItems();
    }, [user]);

    const isItemAdded = (title: string): boolean => {
        return favoriteItems.some((item) => item.title === title);
    };

    const value: FavoritesContextType = {
        resetFavItems,
        addToFavorites,
        removeFromFavorites,
        items: favoriteItems,
        itemsLength: favoriteItems?.length ?? 0,
        isItemInFavorites: isItemAdded,
        openSheet,
        setOpenSheet
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
