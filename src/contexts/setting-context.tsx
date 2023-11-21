import { ReactNode, createContext, useContext, useMemo } from 'react';

import { useToggle } from '../hooks/useToggle';

export const SettingModalContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({
  isOpen: false,
  toggle: () => {},
});

export const SettingModalContextProvider = ({ children }: { children: ReactNode }) => {
  const { status, toggle } = useToggle();

  const values = useMemo(
    () => ({
      isOpen: status,
      toggle,
    }),
    [status, toggle],
  );

  return <SettingModalContext.Provider value={values}>{children}</SettingModalContext.Provider>;
};

export const useSettingsContext = () => {
  const value = useContext(SettingModalContext);
  if (value === null) {
    throw new Error('ThemeChooser Context is missing');
  }
  return value;
};
