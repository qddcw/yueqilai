import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios'
import qs from 'qs';
// Vue.prototype.$http=axios
// axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
import axios from './plugins/axios';
Vue.prototype.$qs = qs;
Vue.use(axios)
Vue.config.productionTip = process.env.NODE_ENV === "production";
import "lib-flexible/flexible"
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs


// import {
//   Toast,Tabbar, TabbarItem ,List, Cell, Card
// } from 'vant'
// Vue.use(Toast)
// Vue.use(Tabbar);
// Vue.use(TabbarItem);
// Vue.use(List);
// Vue.use(Card);
// Vue.use(Cell);
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});