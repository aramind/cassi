import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import FeedbackNotif from "./components/notifications/FeedbackNotif";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={routes.router} />
      <FeedbackNotif />
    </>
  );
}

export default App;
