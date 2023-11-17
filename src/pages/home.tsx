import { useThemeChooser } from "../contexts/theme-chooser";

export const Home = () => {
  const { toggle } = useThemeChooser();
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <p>Home</p>
    </div>
  );
};
