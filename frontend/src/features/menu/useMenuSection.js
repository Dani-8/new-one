// src/features/menu/useMenuSection.js
import { useState } from 'react';

export const useMenuSection = (foods, onAddToCart, onToggleFavorite, onSelectFood, favorites = []) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCustomizeFood, setActiveCustomizeFood] = useState(null);

    // Customize states
    const [spiceLevel, setSpiceLevel] = useState('Medium');
    const [extraCheese, setExtraCheese] = useState(false);
    const [extraSauce, setExtraSauce] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [specialInstructions, setSpecialInstructions] = useState('');

    const filteredFoods = foods.filter((food) => {
        const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
        const matchesSearch =
            food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            food.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleOpenCustomize = (food) => {
        setActiveCustomizeFood(food);
        setSpiceLevel(food.tags.includes('Spicy') ? 'Hot' : 'Medium');
        setExtraCheese(false);
        setExtraSauce(false);
        setGlutenFree(false);
        setSpecialInstructions('');
    };

    const calculateCustomizedPrice = () => {
        if (!activeCustomizeFood) return 0;
        let total = activeCustomizeFood.price;
        if (extraCheese) total += 1.50;
        if (extraSauce) total += 0.75;
        if (glutenFree) total += 2.00;
        return total;
    };

    const handleConfirmAdd = () => {
        if (!activeCustomizeFood) return;

        onAddToCart({
            foodItem: activeCustomizeFood,
            quantity: 1,
            customizations: {
                spiceLevel: (activeCustomizeFood.tags.includes('Spicy') ||
                    activeCustomizeFood.category === 'Burgers' ||
                    activeCustomizeFood.category === 'Pizza & Pasta')
                    ? spiceLevel : undefined,
                extraCheese: activeCustomizeFood.category !== 'Drinks' && activeCustomizeFood.category !== 'Desserts'
                    ? extraCheese : undefined,
                extraSauce: activeCustomizeFood.category !== 'Drinks' ? extraSauce : undefined,
                glutenFree: activeCustomizeFood.category !== 'Drinks' ? glutenFree : undefined,
            },
            specialInstructions: specialInstructions.trim() || undefined
        });

        setActiveCustomizeFood(null);
    };

    return {
        selectedCategory,
        searchQuery,
        activeCustomizeFood,
        spiceLevel,
        extraCheese,
        extraSauce,
        glutenFree,
        specialInstructions,
        filteredFoods,
        setSelectedCategory,
        setSearchQuery,
        setActiveCustomizeFood,
        setSpiceLevel,
        setExtraCheese,
        setExtraSauce,
        setGlutenFree,
        setSpecialInstructions,
        handleOpenCustomize,
        calculateCustomizedPrice,
        handleConfirmAdd,
    };
};