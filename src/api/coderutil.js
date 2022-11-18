import { post, get } from "./http";

const coderutilUrl =
  process.env.NODE_ENV === "development"
    ? "/coderutil"
    : "https://www.coderutil.com";

const baseParams = {
  "access-key": "f0676fdf32dc62a51040a3dfa4345918",
  "secret-key": "122493617a1aba54377d1b692c717fff",
};

/** 获取历史上的今日 */
export const apiToday = async (params) => {
  const res = await get(`${coderutilUrl}/api/resou/v1/today`, {
    ...params,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
};

/** weibo热点 */
export const apiWeibo = async () => {
  const res = await get(`${coderutilUrl}/api/resou/v1/weibo`, {
    ...baseParams,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
};

/** zhihu热搜 */
export const apiZhihu = async () => {
  const res = await get(`${coderutilUrl}/api/resou/v1/zhihu`, {
    ...baseParams,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
};

/** Baidu热搜 */
export const apiBaidu = async () => {
  const res = await get(`${coderutilUrl}/api/resou/v1/baidu`, {
    ...baseParams,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
};

/** 头条热榜 */
export const apiToutiao = async () => {
  const res = await get(`${coderutilUrl}/api/resou/v1/toutiao`, {
    ...baseParams,
  });
  if (res.status === 200) {
    return { ...res.data, status: res.status };
  }
  return { status: res.status };
};
