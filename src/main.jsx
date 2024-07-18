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
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import UserProfile from "./pages/UserProfile.jsx";
import Video from "./pages/Video.jsx";
import Posts from "./pages/Posts.jsx";
import Reels from "./pages/Reels.jsx";
import About from "./pages/About.jsx";
import Photos from "./pages/Profile/Photos/Photos.jsx";
import Friends from "./pages/Profile/Friends/Friends.jsx";
import Videos from "./pages/Videos.jsx";
import Settings from "./pages/Settings.jsx";
import General from "./pages/Settings/General.jsx";
import ProfileIntro from "./pages/Settings/ProfileIntro.jsx";
import Profile from "./pages/Settings/Profile.jsx";
import Following from "./pages/Profile/Friends/pages/Following.jsx";
import Followers from "./pages/Profile/Friends/pages/Followers.jsx";
import OwnProfile from "./pages/OwnProfile.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <QueryClientProvider client={client}>
          {" "}
          <App />
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
      {
        path: "/settings",
        element: <Settings />,
        children: [
          {
            path: "general",
            element: <General />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profileintro",
            element: <ProfileIntro />,
          },
        ],
      },
      {
        path: "/ownprofile",
        element: (
          <AuthRouter>
            <OwnProfile />
          </AuthRouter>
        ),
      },
      {
        path: "/:username",
        element: (
          <AuthRouter>
            <UserProfile />
          </AuthRouter>
        ),
        children: [
          {
            path: "/:username/",
            element: <Posts />,
          },
          {
            path: "/:username/about",
            element: <About />,
          },
          {
            path: "/:username/reels",
            element: <Reels />,
          },
          {
            path: "/:username/photos",
            element: <Photos />,
          },
          {
            path: "/:username/videos",
            element: <Videos />,
          },
          {
            path: "/:username/friends",
            element: <Friends />,
            children: [
              {
                path: "following",
                element: <Following />,
              },
              {
                path: "followers",
                element: <Followers />,
              },
            ],
          },
        ],
      },
      {
        path: "/watch/:vid",
        element: <Video />,
      },
      {
        path: "/watch",
        element: <Video />,
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
  { path: "/user-not-found", element: <PageNotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Sooner />
    <Toaster />
  </Provider>
);
