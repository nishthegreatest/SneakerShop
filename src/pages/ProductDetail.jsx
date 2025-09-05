import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Minus, Plus, Share2, Shield, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { sneakers } from '../data/sneakers';
import { cartStore } from '../store/cart';
import { wishlistStore } from '../store/wishlist';
import { Button, Badge } from '../components/UI';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

  useEffect(() => {
    const foundProduct = sneakers.find(p => p.id === parseInt(id));
    setProduct(foundProduct);

    if (foundProduct) {
      setIsInWishlist(wishlistStore.isInWishlist(foundProduct.id));
      
      // Get related products (same category or brand)
      const related = sneakers
        .filter(p => 
          p.id !== foundProduct.id && 
          (p.category === foundProduct.category || p.brand === foundProduct.brand)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }

    const unsubscribe = wishlistStore.subscribe(() => {
      if (foundProduct) {
        setIsInWishlist(wishlistStore.isInWishlist(foundProduct.id));
      }
    });

    return unsubscribe;
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    cartStore.addItem({ ...product, selectedSize }, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    const added = wishlistStore.toggleItem(product);
    toast.success(added ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8"
        >
          <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badges.map((badge, index) => (
                  <Badge key={index} variant={badge.toLowerCase()}>
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Brand & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                {product.brand}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(4.5)</span>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Select Size
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-lg text-center font-medium transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg min-w-16 text-center text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                className={`p-3 ${isInWishlist ? 'text-red-600 border-red-600' : ''}`}
                size="lg"
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="p-3"
                size="lg"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Free Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            >
              You Might Also Like
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;