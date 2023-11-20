import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../constants/theme";
import { THEME_CONTEXT, THEME_TYPE } from "../types/theme";

export const useThemeToggle = () => {
  const [theme, setTheme] = useState<THEME_TYPE>(THEME_TYPE.dark);
  const [themeConfig, setThemeConfig] =
    useState<THEME_CONTEXT["themeConfig"]>(darkTheme);

  const toggle = () => {
    theme === THEME_TYPE.light
      ? setTheme(THEME_TYPE.dark)
      : setTheme(THEME_TYPE.light);
  };

  useEffect(() => {
    setThemeConfig(theme === THEME_TYPE.light ? lightTheme : darkTheme);
  }, [theme]);

  return {
    theme,
    themeConfig,
    toggle,
  };
};
