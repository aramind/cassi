import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Landing from "./pages/login-register/Landing";
import DashBoardMain from "./pages/dashboard/DashBoardMain";
import LoginRegisterPage from "./pages/login-register/LoginRegisterPage";
import TrackersPage from "./pages/trackers/TrackersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "register",
        element: <LoginRegisterPage action="register" />,
      },
      {
        path: "login",
        element: <LoginRegisterPage action="login" />,
      },
      {
        path: "trackers",
        element: <TrackersPage />,
      },
      {
        path: "dashboard",
        element: <DashBoardMain />,
      },
      {
        path: "*",
        element: <Landing />,
      },
    ],
  },
]);

const routes = { router };

export default routes;
