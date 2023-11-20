import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { CITY_CONTEXT } from "../types/city";
import { TCity } from "../constants/cities";

export const CityChooserContext = createContext<CITY_CONTEXT>({
  currentCity: null,
  setCity(city) {},
});

export const CityChooserProvider = ({ children }: { children: ReactNode }) => {
  const [currentCity, setCurrentCity] =
    useState<CITY_CONTEXT["currentCity"]>(null);

  const setCity = (city: TCity) => {
    setCurrentCity(city);
  };

  const values = useMemo(
    () => ({
      currentCity,
      setCity,
    }),
    [currentCity]
  );

  return (
    <CityChooserContext.Provider value={values}>
      {children}
    </CityChooserContext.Provider>
  );
};

export const useCityChooser = () => {
  const value = useContext(CityChooserContext);
  if (value === null) {
    throw new Error("CityChooser Context is missing");
  }
  return value;
};
