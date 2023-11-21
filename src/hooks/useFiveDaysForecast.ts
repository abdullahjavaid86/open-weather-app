import { getFiveDayForecast } from '../services/weather/weather';
import { useCityStore } from '../store/city';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSettingsStore } from '../store/settings';

export const useFiveDaysForecast = () => {
  const city = useCityStore((state) => state.currentCity);
  const unit = useSettingsStore((state) => state.unit);

  const { isLoading, status, error, data, refetch } = useQuery(
    ['five-day-forecast', city?.id],
    () => (city ? getFiveDayForecast(city.coord.lat, city.coord.lon, unit) : null),
    { enabled: city !== null, refetchInterval: 2000 },
  );

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
