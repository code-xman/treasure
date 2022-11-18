export default function () {
  return {
    // 一个数据
    oneData: {
      hasData: false,
      chpObj: null,
      duObj: null,
      hitokotoObj: null,
      articleObj: null,
    },
    // 热点数据
    hotData: {
      // wb数据
      wbData: [],
      // zhihu数据
      zhData: [],
      // Baidu数据
      bdData: [],
      // toutiao数据
      ttData: [],
    },
    // sayToday数据
    sayTodayData: [],
    // 记零数据
    anniversariesData: [],
  }
}
