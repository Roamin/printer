export default {
  path: '/workspace',
  component: { template: '<router-view></router-view>' },
  children: [
    {
      path: 'view',
      name: 'workspace',
      component: () => import('@/views/workspace')
    },
    {
      path: 'print',
      name: 'print',
      component: () => import('@/views/print')
    }
  ]
}
