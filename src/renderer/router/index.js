import Vue from 'vue'
import Router from 'vue-router'

import workspace from './workspace'
import editor from './editor'
import setting from './setting'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index'),
      children: [
        {
          path: '',
          redirect: '/workspace'
        },
        workspace,
        editor,
        setting
      ]
    }
  ],
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})
