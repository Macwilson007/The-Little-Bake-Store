'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product, CartItem } from '@/data/products';

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    itemCount: number;
    subtotal: number;
    deliveryFee: number;
    total: number;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const DELIVERY_FEE = 2000;

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('tlbs-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch {
                localStorage.removeItem('tlbs-cart');
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem('tlbs-cart', JSON.stringify(items));
        } else {
            localStorage.removeItem('tlbs-cart');
        }
    }, [items]);

    const addItem = useCallback((product: Product, quantity: number = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.product.id !== productId));
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        localStorage.removeItem('tlbs-cart');
    }, []);

    const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                itemCount,
                subtotal,
                deliveryFee,
                total,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                toggleCart,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
