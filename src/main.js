import Vue from 'vue'
import App from './App.vue'
import LazyLoadDirective from "./directives/LazyLoadDirective";

import '@/assets/scss/style.scss';
Vue.config.productionTip = false
Vue.directive("lazyload", LazyLoadDirective);
new Vue({
  render: h => h(App),
}).$mount('#app')
