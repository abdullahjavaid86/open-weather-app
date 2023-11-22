import { getCurrentWeather } from '../services/weather/weather';
import { useCityStore } from '../store/city';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSettingsStore } from '../store/settings';

export const useCurrentWeather = () => {
  const city = useCityStore((state) => state.currentCity);
  const unit = useSettingsStore((state) => state.unit);

  const { isLoading, status, error, data, refetch } = useQuery(
    ['current-weather', city?.id],
    () => (city ? getCurrentWeather(city.coord.lat, city.coord.lon, unit) : null),
    { enabled: city !== null, refetchInterval: 2000 },
  );

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('test', city);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

  useEffect(() => {
    refetch();
  }, [unit, city?.name, refetch]);

  return {
    isLoading,
    status,
    error,
    data,
  };
};
