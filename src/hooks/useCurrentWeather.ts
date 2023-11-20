import { useQuery } from "react-query";
import { getCurrentWeather } from "../services/weather/weather";
import { useCityStore } from "../store/city";
import { useSettingsStore } from "../store/settings";

export const useCurrentWeather = () => {
  const city = useCityStore((state) => state.currentCity);
  const unit = useSettingsStore((state) => state.unit);

  const { isLoading, status, error, data } = useQuery(
    ["current-weather", city?.id],
    () => getCurrentWeather(city!.coord.lat, city!.coord.lon, unit)
  );

  return {
    isLoading,
    status,
    error,
    data,
  };
};
