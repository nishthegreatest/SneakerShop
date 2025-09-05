import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Settings, Package, Heart, ShoppingCart, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { authStore } from '../store/auth';
import { cartStore } from '../store/cart';
import { wishlistStore } from '../store/wishlist';
import { Button, Card } from '../components/UI';

const Profile = () => {
  const [authState, setAuthState] = useState(authStore.getState());
  const [cartState, setCartState] = useState(cartStore.getState());
  const [wishlistState, setWishlistState] = useState(wishlistStore.getState());
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login');
      return;
    }

    const unsubscribeAuth = authStore.subscribe(setAuthState);
    const unsubscribeCart = cartStore.subscribe(setCartState);
    const unsubscribeWishlist = wishlistStore.subscribe(setWishlistState);

    return () => {
      unsubscribeAuth();
      unsubscribeCart();
      unsubscribeWishlist();
    };
  }, [authState.isAuthenticated, navigate]);

  const handleLogout = () => {
    authStore.logout();
    navigate('/');
  };

  if (!authState.isAuthenticated || !authState.user) {
    return null;
  }

  const stats = [
    {
      icon: ShoppingCart,
      label: 'Cart Items',
      value: cartState.itemCount,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Heart,
      label: 'Wishlist',
      value: wishlistState.itemCount,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      icon: Package,
      label: 'Orders',
      value: 0,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {authState.user.name.firstname} {authState.user.name.lastname}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">@{authState.user.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">{authState.user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-white">{authState.user.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <p className="text-gray-900 dark:text-white">{authState.user.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member Since
                  </label>
                  <p className="text-gray-900 dark:text-white">January 2024</p>
                </div>
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  Order History
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </Button>
                <Button variant="danger" onClick={handleLogout} className="justify-start">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/cart">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Cart
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/wishlist">
                    <Heart className="w-4 h-4 mr-2" />
                    My Wishlist
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/products">
                    <Package className="w-4 h-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Account created</span>
                  <span className="text-gray-900 dark:text-white">Jan 15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Profile updated</span>
                  <span className="text-gray-900 dark:text-white">Jan 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last login</span>
                  <span className="text-gray-900 dark:text-white">Today</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;