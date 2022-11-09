import { post, get } from "./http";

const sdUrl = "https://api.shadiao.pro";

/** 获取彩虹糖 */
export const apiChp = async () => {
  const res = await get(`${sdUrl}/chp`);
  if (res.status === 200) {
    return { ...res.data.data, status: res.status };
  }
  return { status: res.status };
};

/** 获取毒鸡汤 */
export const apiDu = async () => {
  const res = await get(`${sdUrl}/du`);
  if (res.status === 200) {
    return { ...res.data.data, status: res.status };
  }
  return { status: res.status };
};
