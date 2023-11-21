import { devtools, persist } from 'zustand/middleware';

import { CITY_CONTEXT } from '../types/city';
import { create } from 'zustand';

export const useCityStore = create<CITY_CONTEXT>()(
  devtools(
    persist(
      (set) => ({
        currentCity: null,
        setCity(city) {
          set(() => ({ currentCity: city }));
        },
      }),
      { name: 'city' },
    ),
  ),
);
