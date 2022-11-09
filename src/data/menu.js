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
    title: "主页",
    path: "/",
    caption: '所有功能集合页面',
  },
  {
    name: "test",
    title: "test",
    path: "/test",
    caption: 'test',
    hidden: !isDev,
  },
  {
    name: "anniversaries",
    title: "下一个记零日",
    path: "/anniversaries",
    caption: '那些值得记住的日子',
  },
  {
    name: "together",
    title: "不如小聚",
    path: "/together",
    caption: '系兄弟，就来看我  --渣渣辉',
  },
  {
    name: "helpSelect",
    title: "专治选择困难",
    path: "/helpSelect",
    caption: '选择困难？不如交给我来选吧！',
  },
  {
    name: "one",
    title: "一个就好",
    path: "/one",
    caption: '每次一个，看看是啥',
  },
  {
    name: "sayToday",
    title: "历史上的今天",
    path: "/sayToday",
    caption: '看看历史的今日发生的什么',
  },
  {
    name: "myWeather",
    title: "天眼气查查",
    path: "/myWeather",
    caption: '查询近日天气情况',
  },
  {
    name: "hotspot",
    title: "每日热点",
    path: "/hotspot",
    caption: '看看今天大家都在关注些什么',
  },
];

export const noHomeMenuList = menuList.filter(item => item.name !== 'home')

export default menuList;
