class CartStore {
  constructor() {
    this.items = this.getStoredCart();
    this.listeners = [];
  }

  getStoredCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
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
    const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      items: this.items,
      total: total,
      itemCount: itemCount
    };
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity: quantity
      });
    }
    
    this.saveToStorage();
    this.notify();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.notify();
      }
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToStorage();
    this.notify();
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.notify();
  }
}

export const cartStore = new CartStore();