const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { name: "home", path: "", component: () => import("pages/Index.vue") },
      {
        name: "test",
        path: "/test",
        component: () => import("pages/test/index.vue"),
      },
      {
        name: "users",
        path: "/users",
        component: () => import("pages/users/index.vue"),
      },
      {
        name: "anniversaries",
        path: "/anniversaries",
        component: () => import("pages/anniversaries/index.vue"),
      },
      {
        name: "remindMe",
        path: "/remindMe",
        component: () => import("pages/anniversaries/RemindMe.vue"),
      },
      {
        name: "together",
        path: "/together",
        component: () => import("pages/together/index.vue"),
      },
      {
        name: "helpSelect",
        path: "/helpSelect",
        component: () => import("pages/helpSelect/index.vue"),
      },
      {
        name: "one",
        path: "/one",
        component: () => import("pages/one/index.vue"),
      },
      {
        name: "myWeather",
        path: "/myWeather",
        component: () => import("pages/myWeather/index.vue"),
      },
      {
        name: "sayToday",
        path: "/sayToday",
        component: () => import("pages/sayToday/index.vue"),
      },
      {
        name: "hotspot",
        path: "/hotspot",
        component: () => import("pages/hotspot/index.vue"),
      },
      {
        name: "lightPlate",
        path: "/lightPlate",
        component: () => import("pages/lightPlate/show.vue"),
      },
      {
        name: "t-rex-runner",
        path: "/t-rex-runner",
        component: () => import("pages/t-rex-runner/index.vue"),
      },
      {
        name: "dailyTask",
        path: "/dailyTask",
        component: () => import("pages/dailyTask/index.vue"),
      },
      {
        name: "logicalThinking",
        path: "/logicalThinking",
        component: () => import("pages/logicalThinking/index.vue"),
      },
      {
        name: "setting",
        path: "/setting",
        component: () => import("pages/setting/index.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
