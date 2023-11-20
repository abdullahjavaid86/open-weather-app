import "./App.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Home } from "./pages/home";
import { useThemeChooser } from "./contexts/theme-chooser";
import { Header } from "./layouts/header";
import { Content } from "./layouts/content";
import { Footer } from "./layouts/footer";

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
        <Home />
      </Content>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
