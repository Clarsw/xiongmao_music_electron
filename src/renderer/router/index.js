/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 5.8
import BasicLayout from '@/layouts/Main'
// 5.8

Vue.use(ant)




Vue.use(ElementUI)

Vue.use(Router)
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push(to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }


export default new Router({
  routes: [
    // 5.8
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      redirect: '/online',
      children: [{
          path: '/online',
          name: 'index',
          component: require('@/pages/Online').default,
        },
        {
          path: '/search',
          name: 'search',
          component: require('@/pages/Search').default,
        },
        {
          path: '/sheet/:id',
          name: 'sheet',
          component: () => import('@/pages/Sheet')
        },
        {
          path: '/sheet/edit/:id',
          name: 'SheetEdit',
          component: () => import('@/pages/Sheet/Edit')
        },
        {
          path: '/album',
          name: 'album',
          component: () => import('@/pages/Album')
        },
        {
          path: '/local',
          name: 'local',
          component: require('@/pages/Local/Local').default
        },
        {
          path: '/user/:cid',
          name: 'Home',
          component: require('@/pages/Home').default,
        },
        {
          path: '/user/edit',
          name: 'UserEdit',
          component: require('@/pages/Home/Edit').default,
        },
        {
          path: '/user/album',
          name: 'UserAlbum',
          component: require('@/pages/Home/My/Album').default,
        },
        {
          path: '/album/edit/:aid',
          name: 'AlbumEdit',
          component: require('@/pages/Album/Edit').default,
        },
        {
          path: '/user/collect',
          name: 'UserCollect',
          component: require('@/pages/Home/My/Collect').default,
        },
        {
          path: '/singer/edit',
          name: 'SingerEdit',
          component: require('@/pages/Singer/Edit').default,
        },
        {
          path: '/singer/:id',
          name: 'Singer',
          component: require('@/pages/Singer').default,
        },
        // {
        //   path: '/offline',
        //   name: 'offline',
        //   component: function (resolve) {
        //     require(['@/views/Offline/index.vue'], resolve)
        //   }
        // }
      ]
    },
    {
      path: '/lyric',
      name: 'lyric',
      component: require('@/pages/Lyric').default,
    },
    //5.8




    // {
    //   path: '/online',
    //   name: 'index',
    //   component: require('@/pages/Online').default,
    // },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: require('@/pages/Search').default,
    // },
    // {
    //   path: '/sheet/:id',
    //   name: 'sheet',
    //   component: () => import('@/pages/Sheet')
    // },
    // {
    //   path: '/sheet/edit/:id',
    //   name: 'SheetEdit',
    //   component: () => import('@/pages/Sheet/Edit')
    // },
    // {
    //   path: '/album',
    //   name: 'album',
    //   component: () => import('@/pages/Album')
    // },
    // {
    //   path: '/local',
    //   name: 'local',
    //   component: require('@/pages/Local/Local').default
    // },
    // {
    //   path: '/user/:cid',
    //   name: 'Home',
    //   component: require('@/pages/Home').default,
    // },
    // {
    //   path: '/user/edit',
    //   name: 'UserEdit',
    //   component: require('@/pages/Home/Edit').default,
    // },
    // {
    //   path: '/user/album',
    //   name: 'UserAlbum',
    //   component: require('@/pages/Home/My/Album').default,
    // },
    // {
    //   path: '/album/edit/:aid',
    //   name: 'AlbumEdit',
    //   component: require('@/pages/Album/Edit').default,
    // },
    // {
    //   path: '/user/collect',
    //   name: 'UserCollect',
    //   component: require('@/pages/Home/My/Collect').default,
    // },
    // {
    //   path: '/singer/edit',
    //   name: 'SingerEdit',
    //   component: require('@/pages/Singer/Edit').default,
    // },
    // {
    //   path: '/singer/:id',
    //   name: 'Singer',
    //   component: require('@/pages/Singer').default,
    // },
    // {
    //   path: '*',
    //   redirect: '/online'
    // }
  ]
})