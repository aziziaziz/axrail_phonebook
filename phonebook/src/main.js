import Vue from 'vue'
import App from './App.vue'

import Axios from 'axios'
import Router from 'vue-router'
import Vuex from './js/vuex'

import Input from './components/MyInput'
Vue.component('Input', Input)

Vue.config.productionTip = false

const ax = Axios;
ax.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$axios = ax

Vue.use(Router)

const router = new Router({
  routes: [
    // { path: '/', component: ContactsPage, meta: { title: 'Contacts' } },
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  next()
})

new Vue({
  render: h => h(App),
  router,
  store: Vuex
}).$mount('#app')
