import { CurrentWeatherResponse } from "../../types/current-weather";
import { ThreeHourResponse } from "../../types/three-hour-weather";
import { Unit } from "../../types/units";
import { weatherApiInstance } from "../api";

export const getCurrentWeather = (
  lat: number,
  lng: number,
  units: Unit = "standard"
) =>
  weatherApiInstance.get<CurrentWeatherResponse>("/weather", {
    params: {
      lat,
      lon: lng,
      units,
    },
  });

export const getFiveDayForecast = (
  lat: number,
  lng: number,
  units: Unit = "standard"
) =>
  weatherApiInstance.get<ThreeHourResponse>("/forecast", {
    params: {
      lat,
      lon: lng,
      units,
    },
  });
