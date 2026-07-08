import React, { useState } from 'react';
import { ClipboardList, Layers, Plus } from 'lucide-react';
import MetricsBanner from './components/MetricsBanner';
import OrderList from './components/OrderList';
import FoodCatalog from './components/FoodCatalog';
import FoodFormModal from './components/FoodFormModal';


export default function AdminPanel({ foods, orders, onUpdateOrderStatus, onAddFood, onUpdateFood, onDeleteFood, isDarkMode }) {
    const [activeTab, setActiveTab] = useState('orders');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [editingFood, setEditingFood] = useState(null);

    const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((acc, curr) => acc + curr.totalAmount, 0);
    const avgRating = foods.reduce((acc, curr) => acc + curr.rating, 0) / (foods.length || 1);


    return (
        <div className="space-y-8 py-4">
            <MetricsBanner totalRevenue={totalRevenue} totalOrders={orders.length} totalFoods={foods.length} avgRating={avgRating} isDarkMode={isDarkMode} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-500/10 pb-4 gap-4">
                <div className="flex space-x-2">
                    <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${activeTab === 'orders' ? 'bg-purple-600 text-white shadow-md' : isDarkMode ? 'bg-zinc-900/30 text-gray-400 border border-white/[0.04]' : 'bg-white text-gray-600 border border-gray-200'}`}>
                        <ClipboardList className="h-4 w-4" /> Live Orders
                    </button>

                    <button onClick={() => setActiveTab('foods')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${activeTab === 'foods' ? 'bg-purple-600 text-white shadow-md' : isDarkMode ? 'bg-zinc-900/30 text-gray-400 border border-white/[0.04]' : 'bg-white text-gray-600 border border-gray-200'}`}>
                        <Layers className="h-4 w-4" /> Menu Foods
                    </button>
                </div>
                {activeTab === 'foods' && (
                    <button onClick={() => { setFormMode('create'); setEditingFood(null); setIsFormOpen(true); }} className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-amber-500 to-amber-600 flex items-center gap-1 cursor-pointer">
                        <Plus className="h-4 w-4" /> Create Recipe
                    </button>
                )}
            </div>
            

            {activeTab === 'orders' ? (
                <OrderList orders={orders} onUpdateOrderStatus={onUpdateOrderStatus} isDarkMode={isDarkMode} />
            ) : (
                <FoodCatalog foods={foods} onEdit={(f) => { setFormMode('edit'); setEditingFood(f); setIsFormOpen(true); }} onDelete={onDeleteFood} isDarkMode={isDarkMode} />
            )}

            {isFormOpen && (
                <FoodFormModal
                    isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode={formMode} food={editingFood}
                    onAdd={onAddFood} onUpdate={onUpdateFood} isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
}