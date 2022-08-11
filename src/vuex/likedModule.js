import getterNames from "./getterNames";
import actionNames from "./actionNames";
import mutationNames from "./mutationNames";

const likedModule = {
  state: () => ({ liked: [] }),
  mutations: {
    [mutationNames.MUTATE_ADD_TO_LIKED]: (state, product) => {
      const item = state.liked.find((p) => p.id === product.id);
      if (item) {
        return;
      }
      state.liked.push({ ...product, liked: true });
    },
    [mutationNames.MUTATE_REMOVE_FROM_LIKED]: (state, product) => {
      const search = state.liked.find((p) => p.id === product.id);
      if (search) {
        state.liked.map((p, index) => {
          if (p.id === product.id && p.liked === true) {
            state.liked.splice(index, 1);
            return;
          }
        });
        state.liked.filter((p) => p.liked === true);
      }
    },
  },
  actions: {
    [actionNames.SET_LIKED_ADD]({ commit }, product) {
      commit(mutationNames.MUTATE_ADD_TO_LIKED, product);
    },
    [actionNames.SET_LIKED_REMOVE]({ commit }, product) {
      commit(mutationNames.MUTATE_REMOVE_FROM_LIKED, product);
    },
  },
  getters: {
    [getterNames.GET_LIKED](state) {
      return state.liked;
    },
    [getterNames.GET_LIKED_NUMBER](state, getters) {
      return getters[getterNames.GET_LIKED].length;
    },
  },
};

export default likedModule;
