import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from 'routes/Home';
import Metric from 'routes/Metric';
import NotFoundPage from 'routes/NotFoundPage';
import 'styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/metric',
        element: <Metric />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(<RouterProvider router={router} />);
