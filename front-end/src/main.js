import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL ? process.env.VUE_APP_BACKEND_URL : 'http://localhost:3002/todos',
});

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
