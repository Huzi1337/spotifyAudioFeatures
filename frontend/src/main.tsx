import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root.tsx";
import { Amplify } from "aws-amplify";
import awsconfig from "./amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import ConfirmSignUp from "./pages/ConfirmSignUp.tsx";

Amplify.configure(awsconfig);

const userRoutes = {
  path: "/v2",
  element: <Root></Root>,
  children: [
    {
      path: "home",
      element: <div>elo home</div>,
    },
    {
      path: "about",
      element: <div>elo about</div>,
    },
    {
      path: "profile",
      element: <div>elo profile</div>,
    },
    {
      path: "audioFeatures",
      element: <div>elo audio</div>,
    },
  ],
};

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  userRoutes,
  { path: "/v2/login", element: <Login /> },
  { path: "/v2/signup", element: <SignUp /> },
  { path: "/v2/confirm", element: <ConfirmSignUp /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  </React.StrictMode>
);
