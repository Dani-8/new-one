import { useState } from 'react';

export const useCartDrawer = (cartItems, onCheckout, onOpenAuth, currentUser, onClose) => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [error, setError] = useState('');

    // Calculate prices
    const subtotal = cartItems.reduce((acc, item) => {
        let itemBasePrice = item.foodItem.price;
        if (item.customizations?.extraCheese) itemBasePrice += 1.50;
        if (item.customizations?.extraSauce) itemBasePrice += 0.75;
        if (item.customizations?.glutenFree) itemBasePrice += 2.00;
        return acc + itemBasePrice * item.quantity;
    }, 0);

    const deliveryFee = subtotal > 0 ? 3.00 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    const handlePlaceOrder = () => {
        setError('');
        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }
        if (!currentUser) {
            setError('Please log in first to place your order!');
            onOpenAuth();
            return;
        }
        if (!address.trim()) {
            setError('Please enter a delivery address');
            return;
        }
        if (!phone.trim()) {
            setError('Please enter your contact phone number');
            return;
        }

        onCheckout({
            address: address.trim(),
            phone: phone.trim(),
            paymentMethod
        });

        // Reset fields
        setAddress('');
        setPhone('');
        // Optionally close drawer after successful checkout
        // onClose();
    };

    return {
        address,
        phone,
        paymentMethod,
        error,
        subtotal,
        deliveryFee,
        tax,
        total,
        setAddress,
        setPhone,
        setPaymentMethod,
        setError,
        handlePlaceOrder,
    };
};