import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root.tsx";
import AuthRoot from "./components/AuthRoot.tsx";
import { Amplify } from "aws-amplify";
import awsconfig from "./amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/v2",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <div>elo home</div>,
      },
      {
        path: "about",
        element: <div>elo about</div>,
      },
    ],
  },
  {
    path: "/v2log",
    element: <AuthRoot />,
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
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  </React.StrictMode>
);
