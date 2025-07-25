import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import App from "@/pages/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />, // ⬅️ Asegúrate de usar este layout
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);
