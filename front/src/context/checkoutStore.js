import zustand from "zustand";

/**
 * Custom hook para manejar el estado del carrito de compras
 * @returns {Object} Objeto con el estado y métodos del carrito
 * @property {Array} cart - Array de productos en el carrito
 * @property {Function} addToCart - Agrega un producto al carrito
 * @property {Function} removeFromCart - Elimina un producto del carrito por ID
 * @property {Function} clearCart - Vacía completamente el carrito
 */
const useCheckoutStore = zustand((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (product) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== product.id) })),
  clearCart: () => set({ cart: [] }),
}));
