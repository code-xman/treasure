/** demo menu  list */
export const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

/** 是否是开发环境 */
const isDev = process.env.NODE_ENV === "development"

/** 菜单 */
const menuList = [
  {
    name: "home",
    path: "/",
    iconfont: 'icon-home',
    meta: {
      title: "主页",
    },
    caption: '所有功能集合页面',
  },
  {
    name: "test",
    path: "/test",
    iconfont: 'icon-a-carryout',
    meta: {
      title: "test",
    },
    caption: 'test',
    hidden: !isDev,
  },
  {
    name: "anniversaries",
    path: "/anniversaries",
    iconfont: 'icon-calendar',
    meta: {
      title: "下一个记零日",
    },
    caption: '那些值得记住的日子',
  },
  {
    name: "together",
    path: "/together",
    iconfont: 'icon-mail',
    meta: {
      title: "不如小聚",
    },
    caption: '系兄弟，就来看我  --渣渣辉',
  },
  {
    name: "helpSelect",
    path: "/helpSelect",
    iconfont: 'icon-a-piechart-circle',
    meta: {
      title: "专治选择困难",
    },
    caption: '选择困难？不如交给我来选吧！',
  },
  {
    name: "one",
    path: "/one",
    iconfont: 'icon-container',
    meta: {
      title: "一个就好",
    },
    caption: '每次一个，看看是啥',
  },
  {
    name: "sayToday",
    path: "/sayToday",
    iconfont: 'icon-reconciliation',
    meta: {
      title: "历史上的今天",
    },
    caption: '看看历史的今日发生的什么',
  },
  {
    name: "myWeather",
    path: "/myWeather",
    iconfont: 'icon-cloud',
    meta: {
      title: "天眼气查查",
    },
    caption: '查询近日天气情况',
  },
  {
    name: "hotspot",
    path: "/hotspot",
    iconfont: 'icon-project',
    meta: {
      title: "每日热点",
    },
    caption: '看看今天大家都在关注些什么',
  },
  {
    name: "lightPlate",
    path: "/lightPlate",
    iconfont: 'icon-control',
    meta: {
      title: "灯牌DIY",
    },
    caption: '可自制独一无二的个性灯牌',
  },
  {
    name: "t-rex-runner",
    path: "/t-rex-runner",
    iconfont: 'icon-run',
    meta: {
      title: "小恐龙快跑",
    },
    caption: '快跑啊~快跑啊~嗷呜~~',
  },
];

export const noHomeMenuList = menuList.filter(item => item.name !== 'home')

export default menuList;
