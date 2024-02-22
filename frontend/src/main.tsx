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
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import AudioFeatures from "./pages/AudioFeatures.tsx";
import PasswordRecovery from "./pages/PasswordRecovery.tsx";
import SendCode from "./pages/audioFeatures/PasswordRecovery/SendCode.tsx";
import ResetPassword from "./pages/audioFeatures/PasswordRecovery/ResetPassword.tsx";
import ResetSuccess from "./pages/audioFeatures/PasswordRecovery/ResetSuccess.tsx";

Amplify.configure(awsconfig);

export const URLS = {
  signUp: "/v2/signup",
  logIn: "/v2/login",
  confirm: "/v2/confirm",
  home: "/v2/home",
  recoverPassword: "/v2/recoverPassword",
};

const userRoutes = {
  path: "/v2",
  element: <Root></Root>,
  children: [
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "profile",
      element: <div>elo profile</div>,
    },
    {
      path: "audioFeatures",
      element: <AudioFeatures />,
    },
  ],
};

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  userRoutes,
  { path: "/v2/login", element: <Login /> },
  { path: "/v2/signup", element: <SignUp /> },
  { path: "/v2/confirm", element: <ConfirmSignUp /> },
  {
    path: URLS.recoverPassword,
    element: <PasswordRecovery />,
    children: [
      { path: "sendCode", element: <SendCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "resetSuccess", element: <ResetSuccess /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  </React.StrictMode>
);
