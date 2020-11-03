import React from 'react';
import classNames from 'classnames';
import axios from 'axios'

import removeSvg from '../../assets/img/remove.svg'

import Badge from '../Badge';

import './List.sass';

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('/lists/' + item.id).then(() => {
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
                    className={classNames(item.className, { 
                        active: item.active ? item.active : activeItem && activeItem.id === item.id})}
                        // Сравниваем, если есть activeItem, и он равен другому item.id, то ставится класс active.
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
                    <span>
                        {item.name}
                        {item.tasks && `(${item.tasks.length})`}
                    {/* Сделал проверку на количество постов внутри */}
                    </span>
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