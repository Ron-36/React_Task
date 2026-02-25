import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import List from "../pages/List";
import Details from "../pages/Details";
import PhotoPage from "../pages/PhotoPage";
import PhotoResult from "../pages/PhotoResult";
import BarChartPage from "../pages/BarChartPage";
import MapPage from "../pages/MapPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/photo",
        element: <PhotoPage />,
      },
      {
        path: "/photo-result",
        element: <PhotoResult />,
      },
      {
        path: "/chart",
        element: <BarChartPage />,
      },
      {
        path: "/map",
        element: <MapPage/>,
      },
    ],
  },
]);