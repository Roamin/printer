export default {
  path: '/workspace',
  component: { render: h => h('router-view') },
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
