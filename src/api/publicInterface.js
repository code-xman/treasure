import { get } from "./http";

/** 和风天气的key */
const qweather_key = 'd5bd83ff416c44b3bc86821f81450c17';
/** 和风天气的baseUrl */
// 付费版
// const qweather_baseUrl = 'https://api.qweather.com';
// 免费版
const qweather_baseUrl = 'https://devapi.qweather.com';

/** 一言接口，请求每日一言 */
export const apiHitokoto = async () => {
  const res = await get("https://v1.hitokoto.cn/");
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
};

/** 每日一文接口 */
export const apiArticleRandom = async () => {
  const res = await get("https://interface.meiriyiwen.com/article/random", {dev: 1});
  if (res.status === 200) {
    return { ...res.data.data, status: res.status };
  }
  return { status: res.status };
};

/** 和风天气 城市搜索 获取城市信息 eg.location等 */
export const apiCityLookup = async (params) => {
  const res = await get(`https://geoapi.qweather.com/v2/city/lookup`, {
    ...params,
    key: qweather_key,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
}

/**
 * 和风天气 天气预报 获取城市n天预报
 * n: 3/7/10/15/30
 */
export const apiWeather = async (params) => {
  const res = await get(`${qweather_baseUrl}/v7/weather/${params?.day || 3}d`, {
    ...params,
    key: qweather_key,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
}
