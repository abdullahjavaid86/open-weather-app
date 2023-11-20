import { cities } from "../constants/cities";

export const getRandomCities = (length = 18) => {
  const citiesList = [...new Set(cities.sort(() => 0.5 - Math.random()))];

  return citiesList.slice(0, length);
};
