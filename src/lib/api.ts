import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const res = await api.get<T>(url, config);
  return res.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const res = await api.post<T>(url, data, config);
  return res.data;
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const res = await api.put<T>(url, data, config);
  return res.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig) => {
  const res = await api.delete<T>(url, config);
  return res.data;
};

export default api;
