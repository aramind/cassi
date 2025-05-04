import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import FeedbackNotif from "./components/notifications/FeedbackNotif";
import AckAlert from "./components/notifications/AckAlert";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={routes.router} />
      <FeedbackNotif />
      <AckAlert />
    </>
  );
}

export default App;
