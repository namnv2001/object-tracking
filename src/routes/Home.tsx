import LinkItem from 'components/LinkItem';
import { path } from 'constants/common';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse" />
    </div>
  );
};

const Home = () => {
  return (
    <div id="sidebar" className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo />
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {path.map((item, index) => (
                    <LinkItem path={item.path} name={item.name} key={index} />
                  ))}
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

export default Home;
