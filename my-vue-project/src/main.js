import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './assets/styles.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
