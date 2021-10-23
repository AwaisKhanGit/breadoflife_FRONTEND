import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
