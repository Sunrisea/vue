// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store.js'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false
var axios = require('axios')
axios.defaults.baseURL = 'http://114.116.4.94:8666/api'
Vue.prototype.$axios=axios

Vue.filter('dateFormatter',function(datestr){
  //过滤器的方法
  if(datestr=="")return;
  var dt=new Date(datestr);
  var y=dt.getFullYear();
  var m=dt.getMonth()+1;//返回值从0-11所以要加1
  var d=dt.getDate();
  return y+'年'+m+'月'+d+'日';
})

Vue.filter('dateFormatter2',function(datestr){
  //过滤器的方法
  if(datestr=="")return;
  var dt=new Date(datestr);
  var y=dt.getFullYear();
  var m=dt.getMonth()+1;//返回值从0-11所以要加1
  var d=dt.getDate();
  var h=dt.getHours();
  var min=dt.getMinutes();
  return y+'年'+m+'月'+d+'日'+h+":"+min;
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
