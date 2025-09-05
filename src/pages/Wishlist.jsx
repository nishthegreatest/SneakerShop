import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wishlistStore } from '../store/wishlist';
import { cartStore } from '../store/cart';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/UI';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [wishlistState, setWishlistState] = useState(wishlistStore.getState());

  useEffect(() => {
    const unsubscribe = wishlistStore.subscribe(setWishlistState);
    return unsubscribe;
  }, []);

  const addAllToCart = () => {
    let addedCount = 0;
    wishlistState.items.forEach(item => {
      cartStore.addItem(item);
      addedCount++;
    });
    
    if (addedCount > 0) {
      toast.success(`${addedCount} item${addedCount !== 1 ? 's' : ''} added to cart!`);
    }
  };

  const clearWishlist = () => {
    wishlistState.items.forEach(item => {
      wishlistStore.removeItem(item.id);
    });
    toast.success('Wishlist cleared!');
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <Heart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save your favorite sneakers here to buy them later.
            </p>
            <Link to="/products">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Explore Products
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
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {wishlistState.itemCount} favorite{wishlistState.itemCount !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
            <Button onClick={addAllToCart}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {wishlistState.items.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/products">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;