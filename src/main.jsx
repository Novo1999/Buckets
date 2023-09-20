import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BucketList from './Pages/BucketList'
import Bucket from './Pages/Bucket'

import ErrorPage from './Pages/ErrorPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Provider } from 'react-redux'
import { store } from './features/store'
import App from './App'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <LoginPage />,
  //   children: [{ path: "otp", element: <OTP /> }],
  // },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'bucket/:id',
        element: <Bucket />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: 'bucket-list',
    element: <BucketList />,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>
)
