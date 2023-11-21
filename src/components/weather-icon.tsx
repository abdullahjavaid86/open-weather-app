import { Weather } from '../types/weather';
import { getWeatherIconFromAssets } from '../utils/weather';

export const WeatherImage = ({ weather }: { weather: Weather }) => {
  const GetImage = getWeatherIconFromAssets(weather);

  return <GetImage />;
};
