import React from 'react';
import FoodItemCard from './FoodItemCard';

export default function FoodCatalog({ foods, onEdit, onDelete, isDarkMode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map(food => (
                <FoodItemCard key={food.id} food={food} onEdit={onEdit} onDelete={onDelete} isDarkMode={isDarkMode} />
            ))}
        </div>
    );
}