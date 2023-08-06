import { Layout } from "antd";
import LinkItem from "components/LinkItem";
import Logo from "components/Logo";
import { path } from "constants/common";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <div id="sidebar" className="min-h-full">
      <nav className="bg-gray-800 sticky top-0">
        <Layout className="bg-gray-800 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo />
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {path.map((item, index) => (
                    <LinkItem
                      path={item.path}
                      location={location.pathname}
                      name={item.name}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </nav>
      <div id="detail">
        <Layout className="mx-auto max-w-7xl h-[calc(100vh_-_64px)] sm:px-6 lg:px-8">
          <div className="mt-6">
            {location.pathname !== "/" ? (
              <Outlet />
            ) : (
              <div className="text-2xl">
                Welcome to object tracking application
              </div>
            )}
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Home;
