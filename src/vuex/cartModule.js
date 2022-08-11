import getterNames from "./getterNames";
import actionNames from "./actionNames";
import mutationNames from "./mutationNames";
import { currencyNames } from "@/js/helpers/exchanger.helpers.js";
const cartModule = {
  state: () => ({ cart: [] }),
  mutations: {
    [mutationNames.MUTATE_ADD_TO_CART]: (state, product) => {
      const search = state.cart.find((p) => p.id === product.id);
      if (search) {
        state.cart.map((p) => {
          if (p.id === product.id) {
            p.quantity += 1;
          }
        });
        return;
      }

      state.cart.push({ ...product, quantity: 1 });
    },
    [mutationNames.MUTATE_REMOVE_FROM_CART]: (state, product) => {
      const search = state.cart.find((p) => p.id === product.id);
      if (search) {
        state.cart.map((p, index) => {
          if (p.id === product.id && p.quantity > 1) {
            p.quantity -= 1;
            return;
          }
          if (p.id === product.id && p.quantity === 1) {
            state.cart.splice(index, 1);
            return;
          }
        });
        state.cart.filter((p) => p.quantity > 0);
      }
    },
    [mutationNames.MUTATE_CLEAR_CART]: (state) => {
      state.cart = [];
    },
  },
  actions: {
    [actionNames.SET_CART_ADD]({ commit }, product) {
      commit(mutationNames.MUTATE_ADD_TO_CART, product);
    },
    [actionNames.SET_CART_REMOVE]({ commit }, product) {
      commit(mutationNames.MUTATE_REMOVE_FROM_CART, product);
    },
    [actionNames.SET_CART_CLEAR]({ commit }) {
      commit(mutationNames.MUTATE_CLEAR_CART);
    },
  },
  getters: {
    [getterNames.GET_CART_TOTAL](state, getters) {
      return getters[getterNames.GET_CART_PRODUCTS].reduce((total, p) => {
        if (p.asset.toLowerCase() === currencyNames.CURRENCY_UAH) {
          return total + p.price * p.quantity;
        } else if (p.asset.toLowerCase() === currencyNames.CURRENCY_BTC) {
          const BTC = total + p.price * 783230 * p.quantity;
          return BTC;
        } else if (p.asset.toLowerCase() === currencyNames.CURRENCY_ETH) {
          const ETH = total + p.price * 35000 * p.quantity;
          return ETH;
        } else {
          const USD = total + p.price * 35 * p.quantity;
          return USD;
        }
      }, 0);
    },
    [getterNames.GET_CART_WEIGHT](state, getters) {
      return getters[getterNames.GET_CART_PRODUCTS].reduce((total, p) => {
        return total + p.weight * p.quantity;
      }, 0);
    },
    [getterNames.GET_CART_QUANTITY](state, getters) {
      return getters[getterNames.GET_CART_PRODUCTS].reduce((total, p) => {
        return total + p.quantity;
      }, 0);
    },
    [getterNames.GET_CART_PRODUCTS](state) {
      return state.cart;
    },
    [getterNames.GET_CART_NUMBER](state, getters) {
      return getters[getterNames.GET_CART_PRODUCTS].reduce(
        (accum, item) => accum + item.quantity,
        0
      );
    },
  },
};

export default cartModule;
