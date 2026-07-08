export function calculateSubtotal(cartItems) {
    return cartItems.reduce((acc, item) => {
        let basePrice = item.foodItem.price;
        if (item.customizations?.extraCheese) basePrice += 1.50;
        if (item.customizations?.extraSauce) basePrice += 0.75;
        if (item.customizations?.glutenFree) basePrice += 2.00;
        return acc + basePrice * item.quantity;
    }, 0);
}

export function calculateTotal(subtotal) {
    return subtotal + 3.00 + subtotal * 0.08;
}

export function generateCartItemId(item) {
    const customizations = item.customizations || {};
    const customHash = JSON.stringify(customizations) + (item.specialInstructions || '');
    let hash = 0;
    for (let i = 0; i < customHash.length; i++) {
        const char = customHash.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    const hashStr = Math.abs(hash).toString(36).slice(0, 8);
    return `${item.foodItem.id}_${hashStr}`;
}