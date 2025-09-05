import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cartStore } from '../store/cart';
import { wishlistStore } from '../store/wishlist';
import { Badge } from './UI';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index = 0 }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistStore.isInWishlist(product.id));
    
    const unsubscribe = wishlistStore.subscribe(() => {
      setIsInWishlist(wishlistStore.isInWishlist(product.id));
    });

    return unsubscribe;
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    cartStore.addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    const added = wishlistStore.toggleItem(product);
    toast.success(added ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badges.map((badge, badgeIndex) => (
              <Badge key={badgeIndex} variant={badge.toLowerCase()}>
                {badge}
              </Badge>
            ))}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Quick Add to Cart - Shows on hover */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 right-3 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-500 dark:text-gray-400">4.5</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {product.stock} in stock
              </span>
            </div>
            
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;