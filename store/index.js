import Vue from 'vue';

export const state = () => ({
  products: [],
  categoryProducts: [],
  selectedProduct: {},
  category: '',
  cart: {},
  token: {},
});

export const actions = {
  async nuxtServerInit({ commit }) {
    const products = await Vue.prototype.$commerce.products.list();
    // Pass products.data
    commit('setProducts', products.data);
  },
  async retrieveCart({ commit }) {
    const cart = await Vue.prototype.$commerce.cart.retrieve();

    if (cart) {
      commit('setCart', cart);
    }
  },
  async addProductToCart({ commit }, payload) {
    const addProduct = await Vue.prototype.$commerce.cart.add(payload, 1);
    if (addProduct) {
      commit('setCart', addProduct.cart);
    }
  },
  async removeProductFromCart({ commit }, payload) {
    const removeProduct = await Vue.prototype.$commerce.cart.remove(payload);
    if (removeProduct) {
      commit('setCart', removeProduct.cart);
    }
  },

  async clearCart({ commit }) {
    const clear = await Vue.prototype.$commerce.cart.empty();

    if (clear) {
      commit('clearCart');
    }
  },
  async addQuantity({ commit }, payload) {
    const quantity = await Vue.prototype.$commerce.cart.update(payload.id, {
      quantity: payload.quantity + 1,
    });
    if (quantity) {
      commit('quantityCart', quantity.cart);
    }
  },
  async subQuantity({ commit }, payload) {
    const quantity = await Vue.prototype.$commerce.cart.update(payload.id, {
      quantity: payload.quantity - 1,
    });
    if (quantity) {
      commit('quantityCart', quantity.cart);
    }
  },
  async genCheckoutToken({ commit }, payload) {
    const token = await v.$commerce.checkout.generateToken(payload, {
      type: 'cart',
    });

    if (token) {
      commit('setToken', token);
    }
  },
};

export const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  updateProduct(state, product) {
    state.selectedProduct = product;
  },
  updateProducts(state, payload) {
    state.categoryProducts = payload;
  },
  updateCategory(state, payload) {
    state.category = payload;
  },
  setCart(state, payload) {
    state.cart = payload;
  },
  clearCart(state) {
    state.cart = {};
  },
  quantityCart(state, payload) {
    state.cart = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
};

export const getters = {
  products(state) {
    return state.products;
  },

  cart(state) {
    return state.cart;
  },
  product(state) {
    return state.selectedProduct;
  },
  cartSubtotal(state) {
    if (state.cart.subtotal) {
      return state.cart.subtotal.formatted;
    }
  },
  categoryProducts(state) {
    return state.categoryProducts;
  },
  category(state) {
    return state.category;
  },
};
