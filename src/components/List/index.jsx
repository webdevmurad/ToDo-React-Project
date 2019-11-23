import React from 'react';
import classNames from 'classnames';
import axios from 'axios'

import removeSvg from '../../assets/img/remove.svg'

import Badge from '../Badge';

import './List.sass';

const List = ({items, isRemovable, onClick, onRemove}) => {
    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
            // удаление сущности по id
            onRemove(item.id);
            // Функция удаления
            });
        }
    }

    return (
        <ul onClick = {onClick} className="list">
            {items.map((item, index) => (
                <li 
                    key={index} 
                    className={classNames(item.className, { active: item.active})}
                >
                    <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
                    <span>{item.name}</span>
                    {isRemovable && (
                        <img 
                            className='list-remove__icon' 
                            src={removeSvg}
                            alt="Remove icon" 
                            onClick={() => removeList(item)} 
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default List;