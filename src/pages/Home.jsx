import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { sneakers } from '../data/sneakers';
import { Button } from '../components/UI';

const Home = () => {
  const featuredSneakers = sneakers.slice(0, 8);
  const newArrivals = sneakers.filter(sneaker => sneaker.badges.includes('New')).slice(0, 4);
  const saleItems = sneakers.filter(sneaker => sneaker.badges.includes('Sale')).slice(0, 4);

  const features = [
    {
      icon: Shield,
      title: 'Authentic Guarantee',
      description: '100% authentic sneakers verified by our experts'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive prices with price match guarantee'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Express delivery available in 24-48 hours'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Step Into
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Greatness
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Discover the latest drops and timeless classics from the world's top sneaker brands. Your perfect pair is waiting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/products?badge=New">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
                    New Arrivals
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Sneaker Animation */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 opacity-20 hidden lg:block"
        >
          <img 
            src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" 
            alt="Featured Sneaker" 
            className="w-64 h-64 object-cover rounded-full"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-blue-600 dark:bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              New Arrivals
            </motion.h2>
            <Link to="/products?badge=New">
              <Button variant="outline" className="hidden sm:flex">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((sneaker, index) => (
              <ProductCard key={sneaker.id} product={sneaker} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            Featured Products
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSneakers.map((sneaker, index) => (
              <ProductCard key={sneaker.id} product={sneaker} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products">
              <Button size="lg">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              🔥 Hot Deals
            </motion.h2>
            <Link to="/products?badge=Sale">
              <Button variant="outline" className="hidden sm:flex">
                View All Sales
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleItems.map((sneaker, index) => (
              <ProductCard key={sneaker.id} product={sneaker} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the SneakRush Community
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get exclusive access to limited drops, early releases, and member-only discounts.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-4 text-lg">
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;