import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import RegisterPage from "./pages/login-register/RegisterPage";
import LoginPage from "./pages/login-register/LoginPage";
import Landing from "./pages/login-register/Landing";
import DashBoardMain from "./pages/dashboard/DashBoardMain";

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
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
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
