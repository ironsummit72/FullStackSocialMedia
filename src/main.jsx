import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import { Toaster as Sooner } from "@/shadcomponents/ui/sonner";
import { Toaster } from "@/shadcomponents/ui/toaster"
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AuthRouter from "./Auth/AuthRouter.jsx";
import Feed from "./pages/Feed.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
    children: [
      {
        path: "/",
        element: <AuthRouter >
          <Feed/>
        </AuthRouter>,
      },
    ],
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
 <Provider store={store}>
  <RouterProvider router={router} />
  <Sooner/>
  <Toaster/>
 </Provider>
);
