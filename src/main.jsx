import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import { Toaster as Sooner } from "@/shadcomponents/ui/sonner";
import { Toaster } from "@/shadcomponents/ui/toaster"
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
     
      </>
    ),
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
 <>
  <RouterProvider router={router} />
  <Sooner/>
  <Toaster/>
 </>
);
