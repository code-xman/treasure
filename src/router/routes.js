
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/test', component: () => import('pages/test/index.vue') },
      { path: '/anniversaries', component: () => import('pages/anniversaries/index.vue') },
      { path: '/remindMe', component: () => import('pages/anniversaries/RemindMe.vue') },
      { path: '/together', component: () => import('pages/together/index.vue') },
      { path: '/helpSelect', component: () => import('pages/helpSelect/index.vue') },
      { path: '/one', component: () => import('pages/one/index.vue') },
      { path: '/myWeather', component: () => import('pages/myWeather/index.vue') },
      { path: '/sayToday', component: () => import('pages/sayToday/index.vue') },
      { path: '/hotspot', component: () => import('pages/hotspot/index.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
