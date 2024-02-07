import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
