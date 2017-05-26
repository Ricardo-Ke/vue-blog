import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import LogIn from '@/components/LogIn'
import Posts from '@/components/Posts'
import PostDetail from '@/components/PostDetail'
import Backend from '@/components/Backend'
// import Category from '@/components/Category'
// const AV = require('leancloud-storage/dist/av')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children: [
        {
          path: '',
          name: 'Posts',
          component: Posts
        },
        {
          path: 'login',
          name: 'Login',
          component: LogIn
        },
        {
          path: 'p/:id',
          name: 'PostDetail',
          component: PostDetail
        },
        {
          path: 'backend',
          name: 'Backend',
          component: Backend
        }
      ]
    }
  ]
})
