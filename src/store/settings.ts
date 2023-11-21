import { devtools, persist } from 'zustand/middleware';

import { TSettings } from '../types/setting';
import { create } from 'zustand';

export const useSettingsStore = create<TSettings>()(
  devtools(
    persist(
      (set) => ({
        unit: 'standard',
        time: '24h',
        setTime(time) {
          set(() => ({ time }));
        },
        setUnits(unit) {
          set(() => ({ unit }));
        },
      }),
      { name: 'settings' },
    ),
  ),
);
