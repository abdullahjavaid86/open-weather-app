import { create } from "zustand";
import { TSettings } from "../types/setting";
import { devtools, persist } from "zustand/middleware";

export const useSettingsStore = create<TSettings>()(
  devtools(
    persist(
      (set) => ({
        unit: "standard",
        time: "24h",
        setTime(time) {
          set(() => ({ time }));
        },
        setUnits(unit) {
          set(() => ({ unit }));
        },
      }),
      { name: "settings" }
    )
  )
);
