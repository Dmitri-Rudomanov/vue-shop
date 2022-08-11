import { createApp } from "vue";
import App from "./App.vue";
import router from "./vue-router";
import store from "./vuex";
import "vue-universal-modal/dist/index.css";
import "./styles/main.scss";

import VueUniversalModal from "vue-universal-modal";
const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueUniversalModal, {
  teleportTarget: "#modals",
});
app.mount("#app");
