import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/main.css'

//开发环境中vue会提示警告信息，但是在生产环境中没有意义，可以减少体积
Vue.config.productionTip = false

Vue.use(ElementUI);
//自定义document事件
Vue.directive('document-click', {
  bind (el, binding, vnode) {
    document.addEventListener('click', binding.value, false)
  },
  // 常见的钩子函数
  // inserted () {
  //   console.log('insert')
  // },
  // update () {
  //   console.log('update')
  // }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

