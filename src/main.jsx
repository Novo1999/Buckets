import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import BucketList from "./Pages/BucketList";
import Bucket from "./Pages/Bucket";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./features/store";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <LoginPage />,
  //   children: [{ path: "otp", element: <OTP /> }],
  // },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "bucketlist",
        element: <BucketList />,
      },
    ],
  },
  {
    path: "bucket",
    element: <Bucket />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
