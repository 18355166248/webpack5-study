import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import { ComponentType, lazy } from "react";

const Home = lazy(
  () =>
    import(
      /* webpackChunkName: "Home" */
      "./pages/Home/index.tsx"
    ) as unknown as Promise<{ default: ComponentType<any> }>
);

const Settings = lazy(
  () =>
    import(
      /* webpackChunkName: "Settings" */
      "./pages/Settings/index.tsx"
    ) as unknown as Promise<{ default: ComponentType<any> }>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
