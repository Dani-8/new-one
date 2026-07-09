// src/features/orders/OrderHistoryModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Calendar, Package, MapPin, CheckCircle, Clock,
  Truck, ShieldCheck, AlertCircle
} from 'lucide-react';

export default function OrderHistoryModal({
  isOpen,
  onClose,
  orders,
  isDarkMode,
  currentUser
}) {
  if (!isOpen) return null;

  const userOrders = orders.filter((o) => o.userId === currentUser?.id);

  const getStatusStep = (status) => {
    switch (status) {
      case 'Received': return 1;
      case 'Preparing': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
      case 'Preparing': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Out for Delivery': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Delivered': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border p-6 shadow-2xl flex flex-col max-h-[85vh] ${isDarkMode
              ? 'bg-[#141416] border-white/[0.04] text-white'
              : 'bg-white border-amber-100 text-gray-800'
            }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-1.5 hover:bg-gray-500/10 text-gray-400 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6">
            <h2 className="font-sans text-xl font-bold tracking-tight">Your Culinary Journeys</h2>
            <p className="text-xs opacity-70 mt-1">
              Track live food prep or review your order histories in real-time.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-6">
            {userOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-10 w-10 text-amber-500/30 mx-auto mb-3" />
                <p className="text-sm opacity-60">You have not submitted any food orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => {
                  const currentStep = getStatusStep(order.status);
                  const isCancelled = order.status === 'Cancelled';

                  return (
                    <div
                      key={order.id}
                      className={`p-4 rounded-xl border space-y-4 ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-amber-50/10 border-amber-100/60'
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-500/5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono opacity-65">
                            ID: {order.id}
                          </span>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-amber-500" />
                            <span className="text-xs font-semibold">
                              {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-sm font-extrabold text-amber-500">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Items Ordered</span>
                        <div className="grid grid-cols-1 gap-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="text-xs flex justify-between items-start">
                              <div>
                                <span className="font-semibold text-amber-500 mr-1.5">{item.quantity}x</span>
                                <span>{item.foodItem.name}</span>
                                {item.specialInstructions && (
                                  <span className="text-[10px] text-amber-500 block italic ml-5">
                                    Note: {item.specialInstructions}
                                  </span>
                                )}
                              </div>
                              <span className="font-mono opacity-70">
                                ${(item.foodItem.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] opacity-80 flex items-center gap-1.5 bg-gray-500/5 p-2 rounded-lg">
                        <MapPin className="h-3.5 w-3.5 text-amber-400" />
                        <span><strong>Delivery Address:</strong> {order.deliveryAddress}</span>
                      </div>

                      {!isCancelled && (
                        <div className="pt-2">
                          <div className="relative flex items-center justify-between">
                            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-500/10 -z-10" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-amber-500 -z-10 transition-all duration-500"
                              style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />

                            {['Received', 'Preparing', 'On the Road', 'Arrived'].map((label, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <div className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all ${currentStep > index
                                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                                    : isDarkMode ? 'bg-zinc-900/60 text-gray-500 border-white/10' : 'bg-white text-gray-400 border-gray-200'
                                  }`}>
                                  {index === 0 && <CheckCircle className="h-4 w-4" />}
                                  {index === 1 && <Clock className="h-4 w-4" />}
                                  {index === 2 && <Truck className="h-4 w-4" />}
                                  {index === 3 && <ShieldCheck className="h-4 w-4" />}
                                </div>
                                <span className="text-[9px] font-bold mt-1.5">{label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isCancelled && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-500/10 p-2 rounded-lg">
                          <AlertCircle className="h-4 w-4" />
                          <span>This order was cancelled by the store administrator.</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}