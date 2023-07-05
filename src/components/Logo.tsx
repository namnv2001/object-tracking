import { useMqttContext } from "context";
import React from "react";

const Logo = () => {
  const { isSubscribed } = useMqttContext();
  return (
    <div className="flex-shrink-0">
      <div
        className={`w-8 h-8 rounded-full ${
          isSubscribed ? "bg-green-500 animate-pulse" : "bg-gray-500"
        }`}
      />
    </div>
  );
};

export default Logo;
