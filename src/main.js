import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Vuetify from "vuetify"

Vue.config.productionTip = false;

Vue.use(Vuetify)

new Vue({
  router,
  store,
  data: {
    google: window.google
  },
  render: h => h(App)
}).$mount("#app");
