import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardMembers from "./Pages/Dashboard/DashboardMembers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Login />,
  },
  {
    path: "/dashboard/admin",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/admin/members",
        element: <DashboardMembers />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
        <ToastContainer />
      </LocalizationProvider>
    </>
  );
}

export default App;
