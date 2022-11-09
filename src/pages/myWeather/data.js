/** 预报信息各key值 */
export const dailyObj = {
  /** 预报日期 */
  fxDate: { name: "预报日期" },
  /** 日出时间 */
  sunrise: { name: "日出时间" },
  /** 日落时间 */
  sunset: { name: "日落时间" },
  /** 月升时间 */
  moonrise: { name: "月升时间" },
  /** 月落时间 */
  moonset: { name: "月落时间" },
  /** -月相名称 */
  moonPhase: { name: "月相名称" },
  /** -月相图标代码 */
  moonPhaseIcon: { name: "月相图标" },
  /** 预报当天最高温度 */
  tempMax: { name: "最高温度", unit: "℃" },
  /** 预报当天最低温度 */
  tempMin: { name: "最低温度", unit: "℃" },
  /** -白天天气状况的图标 */
  iconDay: { name: "天气状况的图标" },
  /** -白天天气状况文字描述 */
  textDay: { name: "天气状况文字描述" },
  /** -夜间天气状况的图标 */
  iconNight: { name: "天气状况的图标" },
  /** -晚间天气状况文字描述 */
  textNight: { name: "天气状况文字描述" },
  /** 白天风向360角度 */
  wind360Day: { name: "风向转角", unit: "°" },
  /** 白天风向 */
  windDirDay: { name: "风向" },
  /** 白天风力等级 */
  windScaleDay: { name: "风力等级" },
  /** 白天风速，公里/小时 */
  windSpeedDay: { name: "风速", unit: "km/h" },
  /** 夜间风向360角度 */
  wind360Night: { name: "风向转角", unit: "°" },
  /** 夜间当天风向 */
  windDirNight: { name: "风向" },
  /** 夜间风力等级 */
  windScaleNight: { name: "风力等级" },
  /** 夜间风速，公里/小时 */
  windSpeedNight: { name: "风速", unit: "km/h" },
  /** 相对湿度，百分比数值 */
  humidity: { name: "相对湿度", unit: "%" },
  /** 当天总降水量，毫米  */
  precip: { name: "总降水量", unit: "mm" },
  /** 大气压强，百帕 */
  pressure: { name: "大气压强", unit: "hPa" },
  /** 能见度，公里 */
  vis: { name: "能见度", unit: "km" },
  /** 云量，百分比 */
  cloud: { name: "云量", unit: "%" },
  /** 紫外线强度指数 */
  uvIndex: { name: "紫外线强度" },
};
/** 总览key */
export const otherKeys = [
  "tempMax",
  "tempMin",
  "humidity",
  "precip",
  "pressure",
  "vis",
  "cloud",
  "uvIndex",
];
/** 日key */
export const dayKeys = [
  "sunrise",
  "sunset",
  // 'iconDay',
  // 'textDay',
  "wind360Day",
  "windDirDay",
  "windScaleDay",
  "windSpeedDay",
];
/** 夜key */
export const nightKeys = [
  "moonrise",
  "moonset",
  // "moonPhase",
  // 'moonPhaseIcon',
  // 'iconNight',
  // 'textNight',
  "wind360Night",
  "windDirNight",
  "windScaleNight",
  "windSpeedNight",
];
/** 紫外线指数 */
export const uvArr = ["最弱", "弱", "中等", "强", "很强"];

/** 测试数据 */
export const testData = [
  {
    /** 预报日期 */
    fxDate: "2022-10-09",
    /** 日出时间 */
    sunrise: "06:23",
    /** 日落时间 */
    sunset: "17:54",
    /** 月升时间 */
    moonrise: "17:48",
    /** 月落时间 */
    moonset: "06:29",
    /** 月相名称 */
    moonPhase: "盈凸月",
    /** 月相图标代码 */
    moonPhaseIcon: "803",
    /** 预报当天最高温度 */
    tempMax: "17",
    /** 预报当天最低温度 */
    tempMin: "2",
    /** 白天天气状况的图标 */
    iconDay: "100",
    /** 白天天气状况文字描述 */
    textDay: "晴",
    /** 夜间天气状况的图标 */
    iconNight: "150",
    /** 晚间天气状况文字描述 */
    textNight: "晴",
    /** 白天风向360角度 */
    wind360Day: "315",
    /** 白天风向 */
    windDirDay: "西北风",
    /** 白天风力等级 */
    windScaleDay: "4-5",
    /** 白天风速，公里/小时 */
    windSpeedDay: "34",
    /** 夜间风向360角度 */
    wind360Night: "0",
    /** 夜间当天风向 */
    windDirNight: "北风",
    /** 夜间风力等级 */
    windScaleNight: "1-2",
    /** 夜间风速，公里/小时 */
    windSpeedNight: "3",
    /** 相对湿度，百分比数值 */
    humidity: "35",
    /**当天总降水量，毫米  */
    precip: "0.0",
    /** 大气压强，百帕 */
    pressure: "1021",
    /** 能见度，公里 */
    vis: "25",
    /** 云量，百分比 */
    cloud: "25",
    /** 紫外线强度指数 */
    uvIndex: "4",
  },
  {
    /** 预报日期 */
    fxDate: "2022-10-10",
    /** 日出时间 */
    sunrise: "06:23",
    /** 日落时间 */
    sunset: "17:54",
    /** 月升时间 */
    moonrise: "17:48",
    /** 月落时间 */
    moonset: "06:29",
    /** 月相名称 */
    moonPhase: "盈凸月",
    /** 月相图标代码 */
    moonPhaseIcon: "803",
    /** 预报当天最高温度 */
    tempMax: "17",
    /** 预报当天最低温度 */
    tempMin: "2",
    /** 白天天气状况的图标 */
    iconDay: "100",
    /** 白天天气状况文字描述 */
    textDay: "晴",
    /** 夜间天气状况的图标 */
    iconNight: "150",
    /** 晚间天气状况文字描述 */
    textNight: "晴",
    /** 白天风向360角度 */
    wind360Day: "315",
    /** 白天风向 */
    windDirDay: "西北风",
    /** 白天风力等级 */
    windScaleDay: "4-5",
    /** 白天风速，公里/小时 */
    windSpeedDay: "34",
    /** 夜间风向360角度 */
    wind360Night: "0",
    /** 夜间当天风向 */
    windDirNight: "北风",
    /** 夜间风力等级 */
    windScaleNight: "1-2",
    /** 夜间风速，公里/小时 */
    windSpeedNight: "3",
    /** 相对湿度，百分比数值 */
    humidity: "35",
    /**当天总降水量，毫米  */
    precip: "0.0",
    /** 大气压强，百帕 */
    pressure: "1021",
    /** 能见度，公里 */
    vis: "25",
    /** 云量，百分比 */
    cloud: "25",
    /** 紫外线强度指数 */
    uvIndex: "4",
  },
];
