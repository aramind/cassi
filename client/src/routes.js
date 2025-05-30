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
import RedirectToLastPath from "./components/RedirectToLastPath";
import LayoutWithNavDial from "./layout/LayoutWithNavDial";
import AnnouncementsPage from "./pages/announcements/AnnouncementsPage";
import TasksPage from "./pages/tasks/TasksPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <RedirectToLastPath /> },
      {
        element: <PersistLoginComponent />,
        children: [
          {
            path: "/",
            element: <ProtectedRoute />,
            children: [
              {
                element: <LayoutWithNavDial />,
                children: [
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
                    element: <AnnouncementsPage />,
                  },
                  {
                    path: "tasks",
                    element: <TasksPage />,
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
              {
                path: "dashboard",
                element: <DashBoardMain />,
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
