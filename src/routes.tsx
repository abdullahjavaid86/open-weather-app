import { createBrowserRouter } from "react-router-dom";
import { routePaths } from "./constants/paths";
import { Home } from "./pages/home";
import { FiveDay } from "./pages/5day";
export const routes = createBrowserRouter([
  {
    path: routePaths.Home,
    element: <Home />,
    children: [
      {
        path: routePaths.Home,
        element: <Home />,
      },
      {
        path: routePaths.FiveDay,
        element: <FiveDay />,
      },
    ],
  },
]);
