import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Landing from "./pages/login-register/Landing";
import DashBoardMain from "./pages/dashboard/DashBoardMain";
import LoginRegisterPage from "./pages/login-register/LoginRegisterPage";
import TrackersPage from "./pages/trackers/TrackersPage";
import ProfilePage from "./pages/profile/ProfilePage";
import PersistLoginComponent from "./components/PersistLoginComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import FutureFeaturePage from "./pages/future/FutureFeaturePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        element: <PersistLoginComponent />,
        children: [
          {
            path: "/",
            element: <ProtectedRoute />,
            children: [
              {
                path: "dashboard",
                element: <DashBoardMain />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "trackers",
                element: <TrackersPage />,
              },
              {
                path: "announcements",
                element: <FutureFeaturePage />,
              },
              {
                path: "tasks",
                element: <FutureFeaturePage />,
              },
              {
                path: "dues",
                element: <FutureFeaturePage />,
              },
              {
                path: "files",
                element: <FutureFeaturePage />,
              },
              {
                path: "future-feature",
                element: <FutureFeaturePage />,
              },
            ],
          },
        ],
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
        path: "*",
        element: <Landing />,
      },
    ],
  },
]);

const routes = { router };

export default routes;
