import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
// import axios from 'axios';
import VueAxios from 'vue-axios';
import axios from "axios";
import LazyLoadDirective from "./directives/LazyLoadDirective";

import '@/assets/scss/style.scss';
Vue.use(Vuex);
Vue.config.productionTip = false
import store from '@/store/store'
Vue.directive("lazyload", LazyLoadDirective);
Vue.use(VueAxios, axios);
// Vue.use(axios);
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
