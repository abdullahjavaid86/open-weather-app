import axios from 'axios';

const weatherApiInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

weatherApiInstance.interceptors.request.use((config) => {
  config.params.appid = '7d9f2841305b60617bba6853e2614cfa';
  return config;
});

export { weatherApiInstance };
