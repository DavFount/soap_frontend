import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import axios from "axios";
import VueAxios from "vue-axios";
// import socketio from "socket.io-client";
// import VueSocketIO from "vue-3-socket.io";
// export const SocketInstance = socketio("http://localhost:3000");
import App from "./App.vue";
import router from "./router";
import VueGravatar from "vue3-gravatar";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./scss/styles.scss";
import * as bootstrap from "bootstrap";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(pinia);

// app.use(
//   new VueSocketIO({
//     debug: false,
//     connection: SocketInstance,
//   })
// );

const options = {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};
app.use(Toast, options);
app.use(VueGravatar);

app.use(router);
app.use(VueAxios, axios);

app.mount("#app");
