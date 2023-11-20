import { useQuery } from "react-query";
import { getCurrentWeather } from "../services/weather/weather";
import { useCityStore } from "../store/city";
import { useSettingsStore } from "../store/settings";
import { useEffect } from "react";

export const useCurrentWeather = () => {
  const city = useCityStore((state) => state.currentCity);
  const unit = useSettingsStore((state) => state.unit);

  const { isLoading, status, error, data, refetch } = useQuery(
    ["current-weather", city?.id],
    () => getCurrentWeather(city!.coord.lat, city!.coord.lon, unit),
    { enabled: city !== null, refetchInterval: 2000 }
  );

  useEffect(() => {
    refetch();
  }, [unit, city?.name]);

  return {
    isLoading,
    status,
    error,
    data,
  };
};
