import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ILinkItem } from 'types';

const LinkItem: React.FC<ILinkItem> = ({ path, name }) => {
  const location = useLocation();
  return (
    <Link
      to={path}
      className={`${
        location.pathname === path ? 'bg-gray-900' : 'hover:bg-gray-700'
      } text-white rounded-md px-3 py-2 text-sm font-medium`}
    >
      {name}
    </Link>
  );
};

export default LinkItem;
