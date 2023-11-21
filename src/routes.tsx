import { FiveDay } from './pages/5day';
import { Home } from './pages/home';
import { createBrowserRouter } from 'react-router-dom';
import { routePaths } from './constants/paths';
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
