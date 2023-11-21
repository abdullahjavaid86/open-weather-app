import axios from 'axios';

const weatherApiInstance = axios.create({
  baseURL: import.meta.env.VITE_OPEN_WEATHER_ENDPOINT,
});

weatherApiInstance.interceptors.request.use((config) => {
  config.params.appid = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  return config;
});

export { weatherApiInstance };
