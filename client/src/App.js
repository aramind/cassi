import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={routes.router} />
    </>
  );
}

export default App;
