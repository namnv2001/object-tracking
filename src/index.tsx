import { MQTTProvider } from 'context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from 'routes/Home';
import Metric from 'routes/Metric';
import Monitor from 'routes/Monitor';
import NotFoundPage from 'routes/NotFoundPage';
import 'styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/monitor',
        element: <Monitor />,
      },
      {
        path: '/metric',
        element: <Metric />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <MQTTProvider>
    <RouterProvider router={router} />
  </MQTTProvider>
);
