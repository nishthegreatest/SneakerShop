import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            SneakRush
          </span>
        </Link>

        {/* 404 Animation */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Oops! The page you're looking for seems to have stepped out. 
            Maybe it's trying on some new sneakers?
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Fun Animation */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mt-12 opacity-20"
          >
            <img 
              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" 
              alt="Lost Sneaker" 
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Still lost? Try searching for your favorite sneakers above!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;