
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/Index.vue') },
      { name: 'test', path: '/test', component: () => import('pages/test/index.vue') },
      { name: 'anniversaries', path: '/anniversaries', component: () => import('pages/anniversaries/index.vue') },
      { name: 'remindMe', path: '/remindMe', component: () => import('pages/anniversaries/RemindMe.vue') },
      { name: 'together', path: '/together', component: () => import('pages/together/index.vue') },
      { name: 'helpSelect', path: '/helpSelect', component: () => import('pages/helpSelect/index.vue') },
      { name: 'one', path: '/one', component: () => import('pages/one/index.vue') },
      { name: 'myWeather', path: '/myWeather', component: () => import('pages/myWeather/index.vue') },
      { name: 'sayToday', path: '/sayToday', component: () => import('pages/sayToday/index.vue') },
      { name: 'hotspot', path: '/hotspot', component: () => import('pages/hotspot/index.vue') },
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
