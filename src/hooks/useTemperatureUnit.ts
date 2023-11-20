import { useSettingsStore } from "../store/settings";

export const useTemperatureUnit = () => {
  const unit = useSettingsStore((state) => state.unit);
  switch (unit) {
    case "imperial":
      return "⁰F";
    case "metric":
      return "⁰C";
    default:
      return "K";
  }
};
