import { create } from "zustand";
import { CITY_CONTEXT } from "../types/city";
import { devtools, persist } from "zustand/middleware";

export const useCityStore = create<CITY_CONTEXT>()(
  devtools(
    persist(
      (set) => ({
        currentCity: null,
        setCity(city) {
          set(() => ({ currentCity: city }));
        },
      }),
      { name: "city" }
    )
  )
);
