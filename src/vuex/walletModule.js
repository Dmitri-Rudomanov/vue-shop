import getterNames from "./getterNames";
import actionNames from "./actionNames";
import mutationNames from "./mutationNames";

const walletModule = {
  state: () => ({
    wallet: {
      btc: 10,
      uah: 100000,
      eth: 25,
      usd: 0,
    },
  }),
  mutations: {
    [mutationNames.MUTATE_WALLET_MINUS]: (state, payload) => {
      for (const key in state.wallet) {
        const payKey = Object.keys(payload).join();
        if (key === payKey) {
          const payValue = Number(Object.values(payload).join());
          state.wallet = {
            ...state.wallet,
            [key]: state.wallet[key] - payValue,
          };
        }
      }
    },
    [mutationNames.MUTATE_WALLET_PLUS]: (state, payload) => {
      for (const key in state.wallet) {
        const payKey = Object.keys(payload).join();
        if (key === payKey) {
          const payValue = Number(Object.values(payload).join());
          state.wallet = {
            ...state.wallet,
            [key]: state.wallet[key] + payValue,
          };
        }
      }
    },
  },
  actions: {
    [actionNames.SET_WALLET_MINUS]({ commit }, payload) {
      commit(mutationNames.MUTATE_WALLET_MINUS, payload);
    },
    [actionNames.SET_WALLET_PLUS]({ commit }, payload) {
      commit(mutationNames.MUTATE_WALLET_PLUS, payload);
    },
  },
  getters: {
    [getterNames.GET_WALLET](state) {
      return state.wallet;
    },
  },
};

export default walletModule;
