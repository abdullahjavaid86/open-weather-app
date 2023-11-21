import { useEffect, useState } from 'react';

import { useSettingsStore } from '../store/settings';

export const useCurrentTime = () => {
  const timeUnit = useSettingsStore((state) => state.time);

  const [time, setTime] = useState(
    new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: timeUnit === '12h',
    }),
  );

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setTime(
        new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: timeUnit === '12h',
        }),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return time;
};
