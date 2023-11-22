import { UnknownIcon } from '../components/icons/unknown';
import type { Weather } from '../types/weather';
import { WeatherClear } from '../components/icons/weather-clear';
import { WeatherCloudy } from '../components/icons/weather-cloudy';
import { WeatherFog } from '../components/icons/weather-fog';
import { WeatherHail } from '../components/icons/weather-hail';
import { WeatherLightning } from '../components/icons/weather-lightning';
import { WeatherLightningRainy } from '../components/icons/weather-lightning-rainy';
import { WeatherPartlyCloudy } from '../components/icons/weather-partly-cloudy';
import { WeatherPouring } from '../components/icons/weather-pouring';
import { WeatherSnowHeavy } from '../components/icons/weather-snowy-heavy';
import { WeatherSnowRainy } from '../components/icons/weather-snowy-rainy';
import { WeatherSnowy } from '../components/icons/weather-snowy';
import { WeatherWindyVariant } from '../components/icons/weather-windy-variant';

export const getWeatherIconUrl = (icon: string) => {
  return `http://openweathermap.org/img/w/${icon}.png`;
};

export const getWeatherIconFromAssets = (weather: Weather, getFromOpenWeather = false) => {
  if (getFromOpenWeather) return getWeatherIconUrl(weather.icon);
  switch (weather.description) {
    case 'few clouds':
      return WeatherCloudy;
    case 'overcast clouds':
      return WeatherCloudy;
    case 'broken clouds':
      return WeatherCloudy;
    case 'clear sky':
      return WeatherClear;
    case 'fog':
      return WeatherFog;
    case 'freezing rain':
      return WeatherHail;
    case 'light rain':
      return WeatherLightningRainy;
    case 'thunderstorm':
      return WeatherLightning;
    case 'scattered clouds':
      return WeatherPartlyCloudy;
    case 'rain':
      return WeatherPouring;
    case 'drizzle':
      return WeatherPouring;
    case 'light intensity drizzle':
      return WeatherPouring;
    case 'heavy snow':
      return WeatherSnowHeavy;
    case 'rain and snow':
      return WeatherSnowRainy;
    case 'light snow':
      return WeatherSnowy;
    case 'sand/dust whirls':
      return WeatherWindyVariant;
    default:
      return UnknownIcon;
  }
};
