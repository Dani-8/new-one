import { useState } from 'react';
import { generateCartItemId } from '../utils/pricing';

export function useCart(triggerToast) {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (item) => {
        const customizations = item.customizations || {};
        const cartItemId = generateCartItemId(item);
        const existingIndex = cartItems.findIndex((it) => it.id === cartItemId);

        if (existingIndex > -1) {
            const updated = [...cartItems];
            updated[existingIndex].quantity += (item.quantity || 1);
            setCartItems(updated);
        } else {
            setCartItems((prev) => [...prev, { ...item, customizations, id: cartItemId }]);
        }

        triggerToast(`Added ${item.foodItem.name} to basket!`, 'success');
    };

    const handleUpdateCartQuantity = (cartItemId, change) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const handleRemoveCartItem = (cartItemId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
        triggerToast('Item removed from basket', 'info');
    };

    const clearCart = () => setCartItems([]);

    return {
        cartItems,
        handleAddToCart,
        handleUpdateCartQuantity,
        handleRemoveCartItem,
        clearCart,
    };
}