class WishlistStore {
  constructor() {
    this.items = this.getStoredWishlist();
    this.listeners = [];
  }

  getStoredWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }

  saveToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notify() {
    this.listeners.forEach(callback => callback(this.getState()));
  }

  getState() {
    return {
      items: this.items,
      itemCount: this.items.length
    };
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (!existingItem) {
      this.items.push(product);
      this.saveToStorage();
      this.notify();
      return true;
    }
    
    return false;
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToStorage();
    this.notify();
  }

  isInWishlist(productId) {
    return this.items.some(item => item.id === productId);
  }

  toggleItem(product) {
    if (this.isInWishlist(product.id)) {
      this.removeItem(product.id);
      return false;
    } else {
      this.addItem(product);
      return true;
    }
  }
}

export const wishlistStore = new WishlistStore();