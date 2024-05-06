import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import { Toaster as Sooner } from "@/shadcomponents/ui/sonner";
import { Toaster } from "@/shadcomponents/ui/toaster";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AuthRouter from "./Auth/AuthRouter.jsx";
import Feed from "./pages/Feed.jsx";
import SetProfile from "./pages/SetProfile.jsx";
import SetDisplayPicture from "./pages/SetDisplayPicture.jsx";
import SetCoverPicture from "./pages/SetCoverPicture.jsx";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
const client=new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <QueryClientProvider client={client}>  <App />
      </QueryClientProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthRouter>
            <Feed />
          </AuthRouter>
        ),
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
  {
    path: "/set",
    element: (
      <AuthRouter>
        <SetProfile />
      </AuthRouter>
    ),
    children: [
      {
        path: "dp",
        element: <SetDisplayPicture />,
      },
      {
        path: "cover",
        element: <SetCoverPicture />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Sooner />
    <Toaster />
  </Provider>
);
