import "./App.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Home } from "./pages/home";
import { useThemeChooser } from "./contexts/theme-chooser";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Helvetica, Roboto, Arial, sans-serif;
    transition: all 0.50s linear;
  }
  `;

function App() {
  const { themeConfig } = useThemeChooser();
  return (
    <ThemeProvider theme={themeConfig}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;
