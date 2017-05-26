// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import store from './store/store'
import { APP_ID, APP_KEY } from './app.config'
const AV = require('leancloud-storage/dist/av')

import '@/assets/styles/reset.css'
import '@/assets/styles/common.css'
import '@/assets/styles/media.styl'
import { Icon, Message, MessageBox, Loading, Input, Row, Col, Button, Tag } from 'element-ui'

Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Loading.directive)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Tag)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    })
  }
})
