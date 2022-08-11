import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import cartModule from "./cartModule";
import likedModule from "./likedModule";
import walletModule from "./walletModule";

const store = createStore({
  modules: {
    cartModule: cartModule,
    likedModule: likedModule,
    walletModule: walletModule,
  },
  plugins: [createPersistedState()],
});
export default store;
