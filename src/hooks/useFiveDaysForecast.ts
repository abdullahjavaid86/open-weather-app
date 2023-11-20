import { useQuery } from "react-query";
import { getFiveDayForecast } from "../services/weather/weather";
import { useCityStore } from "../store/city";
import { useSettingsStore } from "../store/settings";

export const useFiveDaysForecast = () => {
  const city = useCityStore((state) => state.currentCity);
  const unit = useSettingsStore((state) => state.unit);

  const { isLoading, status, error, data } = useQuery(
    ["five-day-forecast", city?.id],
    () => getFiveDayForecast(city!.coord.lat, city!.coord.lon, unit)
  );

  return {
    isLoading,
    status,
    error,
    data,
  };
};
