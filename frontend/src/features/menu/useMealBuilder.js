// src/features/menu/useMealBuilder.js
import { useState } from 'react';

export const useMealBuilder = (foods, onAddToCart, onSelectFood) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [curatedBundle, setCuratedBundle] = useState(null);

    const promptSuggestions = [
        { label: "🔥 Spicy under $20", text: "I have a budget of $20, love spicy food, and want a full meal combo." },
        { label: "🥗 Healthy Vegan combo", text: "Recommend a high protein, healthy vegan lunch package with a drink." },
        { label: "🍔 Premium Cheat Day Feast", text: "Give me the ultimate rich gourmet burger bundle with delicious extras!" },
        { label: "🧁 Sweet Late Night Treat", text: "Looking for a delicious sweet dessert and warm drink combo under $15." }
    ];

    const handleSuggestClick = (text) => setPrompt(text);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setCuratedBundle(null);

        try {
            const response = await fetch('/api/gemini/curate-meal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, foods })
            });

            if (!response.ok) {
                throw new Error('Our AI Chef is busy whisking sauces! Please try again in a moment.');
            }

            const data = await response.json();

            const matchedItems = (data.recommendedItemIds || [])
                .map(id => foods.find(f => f.id === id))
                .filter(Boolean);

            if (matchedItems.length === 0) {
                throw new Error("We couldn't find any menu items that matched that exact combination. Try adjusting your request or search!");
            }

            setCuratedBundle({
                name: data.bundleName || "Custom AI Flavor Package",
                explanation: data.chefExplanation || "This curated pairing offers beautiful, rich flavors carefully selected to suit your tastes.",
                items: matchedItems,
                prepTime: data.estimatedPrepTime || 15
            });

        } catch (err) {
            console.error(err);
            setError(err.message || 'An unexpected error occurred. Please try again!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBundleToCart = () => {
        if (!curatedBundle) return;

        curatedBundle.items.forEach(item => {
            onAddToCart({
                foodItem: item,
                quantity: 1,
                customizations: {
                    extraCheese: false,
                    extraSauce: false,
                    glutenFree: item.tags?.includes('Gluten-Free')
                }
            });
        });

        alert(`🎉 Success! All ${curatedBundle.items.length} items from "${curatedBundle.name}" have been added to your basket!`);
    };

    const calculateBundleTotal = () => {
        if (!curatedBundle) return 0;
        return curatedBundle.items.reduce((sum, item) => sum + item.price, 0);
    };

    return {
        prompt,
        isLoading,
        error,
        curatedBundle,
        promptSuggestions,
        setPrompt,
        handleSuggestClick,
        handleSubmit,
        handleAddBundleToCart,
        calculateBundleTotal,
    };
};