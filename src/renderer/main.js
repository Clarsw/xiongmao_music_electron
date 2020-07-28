import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import globalVue from './plugins/globalComponents'
import filters from './filters'
require('./mock')

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(globalVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// add myself-------------
Vue.prototype.$bus = new Vue()

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')