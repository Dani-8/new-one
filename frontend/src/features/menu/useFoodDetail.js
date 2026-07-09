// src/features/menu/useFoodDetail.js
import { useState, useEffect } from 'react';

export const useFoodDetail = (food, onAddToCart, onOpenAuth, isAuthenticated, onBack) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraSauce, setExtraSauce] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedPresets, setSelectedPresets] = useState([]);
  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [food]);

  const getPresetsForCategory = () => {
    if (food?.category === 'Burgers') {
      return [
        { id: 'no_onions', text: 'No Onions 🧅' },
        { id: 'well_done', text: 'Well-done Patty 🥩' },
        { id: 'sauce_side', text: 'Sauce on the Side 🏺' },
        { id: 'extra_crispy', text: 'Extra Toasted Buns 🍞' }
      ];
    }
    if (food?.category === 'Pizza & Pasta') {
      return [
        { id: 'well_baked', text: 'Crispy Crust 🍕' },
        { id: 'garlic_butter', text: 'Garlic Crust Brush 🧄' },
        { id: 'no_olives', text: 'No Olives 🫒' },
        { id: 'sauce_side', text: 'Sauce on the Side 🏺' }
      ];
    }
    if (food?.category === 'Drinks') {
      return [
        { id: 'less_ice', text: 'Less Ice 🧊' },
        { id: 'no_sugar', text: 'Sugar Free 🍃' },
        { id: 'extra_lemon', text: 'Extra Lemon Slice 🍋' }
      ];
    }
    return [
      { id: 'eco_pack', text: 'Eco-friendly Packaging 📦' },
      { id: 'sauce_side', text: 'Sauce on Side 🏺' },
      { id: 'no_cutlery', text: 'No Plastic Cutlery 🍴' }
    ];
  };

  const presets = getPresetsForCategory();

  const handleTogglePreset = (presetText) => {
    setSelectedPresets((prev) =>
      prev.includes(presetText)
        ? prev.filter((p) => p !== presetText)
        : [...prev, presetText]
    );
  };

  const calculateCustomizedPrice = () => {
    let price = food?.price || 0;
    if (extraCheese) price += 1.50;
    if (extraSauce) price += 0.75;
    if (glutenFree) price += 2.00;
    return price * quantity;
  };

  const handleConfirmAdd = () => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }

    const customs = {
      spiceLevel: (food?.tags.includes('Spicy') || food?.category === 'Burgers' || food?.category === 'Pizza & Pasta') 
        ? spiceLevel : undefined,
      extraCheese: food?.category !== 'Drinks' && food?.category !== 'Desserts' ? extraCheese : undefined,
      extraSauce: food?.category !== 'Drinks' ? extraSauce : undefined,
      glutenFree: food?.category !== 'Drinks' ? glutenFree : undefined
    };

    const combinedNotes = [
      ...selectedPresets,
      ...(specialInstructions.trim() ? [specialInstructions.trim()] : [])
    ].join(', ');

    onAddToCart({
      foodItem: food,
      quantity,
      customizations: customs,
      specialInstructions: combinedNotes || undefined
    });

    onBack();
  };

  return {
    quantity,
    spiceLevel,
    extraCheese,
    extraSauce,
    glutenFree,
    specialInstructions,
    selectedPresets,
    showCustomization,
    presets,
    setQuantity,
    setSpiceLevel,
    setExtraCheese,
    setExtraSauce,
    setGlutenFree,
    setSpecialInstructions,
    setSelectedPresets,
    setShowCustomization,
    handleTogglePreset,
    calculateCustomizedPrice,
    handleConfirmAdd,
  };
};