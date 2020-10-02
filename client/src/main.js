import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/tailwind.css"
import loader from "vue-ui-preloader";

Vue.use(loader);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
