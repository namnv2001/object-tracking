import React from 'react';
import { Link } from 'react-router-dom';
import { ILinkItem } from 'types';

const LinkItem: React.FC<ILinkItem> = ({ path, name, location }) => {
  return (
    <Link
      to={path}
      className={`${
        location === path ? 'bg-gray-900' : 'hover:bg-gray-700'
      } text-white rounded-md px-3 py-2 text-sm font-medium no-underline`}
    >
      {name}
    </Link>
  );
};

export default LinkItem;
