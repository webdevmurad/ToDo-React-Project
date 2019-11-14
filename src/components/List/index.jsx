import React from 'react';
import classNames from 'classnames';

import './List.sass';

const List = ({items, isRemoVable}) => {
  console.log(items, isRemoVable);
    return (
        <ul className="list">
          {
            items.map((item, index) => (
              <li key={index} className={classNames(item.className, {'active': item.active})}>
                <i>{item.icon ? item.icon : <i className={`badge badge--${item.color}`}></i>}</i>
                <span>{item.name}</span>
              </li>
            ))}
        </ul>
    )
}

export default List;