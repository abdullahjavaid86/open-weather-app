import { TCity } from '../constants/cities';

export type CITY_CONTEXT = {
  currentCity: TCity | null;
  setCity: (city: TCity) => void;
};
