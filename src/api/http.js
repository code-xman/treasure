// HTTP 请求封装
import axios from "axios";

// 配置合并
const _axios = axios.create();

// 请求封装
export const request = async (options) => {
  return await _axios.request(options);
};

// GET
export const get = (url, params = {}, options = {}) => {
  return request({
    ...options,
    url,
    params,
    method: "GET",
  });
};

// POST
export const post = async (url, data = {}, options = {}) => {
  return await request({
    ...options,
    url,
    data,
    method: "POST",
  });
};
