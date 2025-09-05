import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cartStore } from '../store/cart';
import { Button } from '../components/UI';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cartState, setCartState] = useState(cartStore.getState());

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(setCartState);
    return unsubscribe;
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    cartStore.updateQuantity(productId, newQuantity);
    toast.success('Cart updated!');
  };

  const removeItem = (productId) => {
    const item = cartState.items.find(item => item.id === productId);
    cartStore.removeItem(productId);
    toast.success(`${item.name} removed from cart!`);
  };

  const clearCart = () => {
    cartStore.clearCart();
    toast.success('Cart cleared!');
  };

  const handleCheckout = () => {
    toast.success('Checkout functionality coming soon!');
  };

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any sneakers to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cartState.itemCount} item{cartState.itemCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartState.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`}>
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.brand} • {item.category}
                          </p>
                          {item.selectedSize && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Size: {item.selectedSize}
                            </p>
                          )}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded min-w-12 text-center text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${item.price} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${cartState.total.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {cartState.total >= 100 ? 'Free' : '$10.00'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(cartState.total * 0.08).toFixed(2)}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${(cartState.total + (cartState.total >= 100 ? 0 : 10) + cartState.total * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                {cartState.total >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center"
                  >
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                      🎉 You qualify for free shipping!
                    </p>
                  </motion.div>
                )}
              </div>
              
              <div className="mt-6 space-y-3">
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <Link to="/products">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;