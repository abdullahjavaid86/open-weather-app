import "./App.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Home } from "./pages/home";
import { useThemeChooser } from "./contexts/theme-chooser";
import { Header } from "./layouts/header";
import { Footer } from "./layouts/footer";
import { Route, Routes } from "react-router-dom";
import { routePaths } from "./constants/paths";
import { FiveDay } from "./pages/5day";
import { Content } from "./layouts/content";

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
      <Header />
      <Content>
        <Routes>
          <Route path={routePaths.Home} element={<Home />} />
          <Route path={routePaths.FiveDay} element={<FiveDay />} />
        </Routes>
      </Content>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
