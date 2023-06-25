import useMqtt from 'hooks';
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
  const { subscribeTopic } = useMqtt();

  useEffect(() => {
    subscribeTopic({ topic: 'test' });
  });

  return (
    <div id="sidebar" className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Object tracking"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/metric"
                    className="hover:bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Metric
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
