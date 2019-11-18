import React from 'react';
import classNames from 'classnames';

import removeSvg from '../../assets/img/remove.svg'

import Badge from '../Badge';

import './List.sass';

const List = ({items, isRemoVable, onClick, onRemove}) => {
    const removeList = (item) => {
      if(window.confirm('Вы действительно хотите удалить список?')) {
        onRemove(item);
      }
    }


    return (
        <ul 
          onClick = {onClick}
          className="list">
          {
            items.map((item, index) => (
                <li key={index} 
                lassName={classNames(item.className, {'active': item.active})
              }>
                <i>{item.icon ? item.icon : <Badge color={item.color}/>}</i>
                <span>{item.name}</span>
                
                {isRemoVable && <img src={removeSvg} 
                                onClick={removeList} 
                                className='list-remove__icon' 
                                alt="Remove icon"/>}
              </li>
            ))}
        </ul>
    )
}

export default List;