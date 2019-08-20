import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import App from './App.vue';
import Modal from './plugins/modal';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Modal);
Vue.use(VueSocketio, socketio('http://localhost:3000'), store);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
