import React, {useState, useEffect} from 'react';
import axios from 'axios'

import List from '../List';
import Badge from '../Badge';

import closeSvg from '../../assets/img/close.svg';

import './AddListButton.sass';

const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    // блок с инпутом и цветами
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    // Идет загрузка
    const [inputValue, setInputValue] = useState('');
    // Хук который принимает value у инпута как состояние.
    useEffect(() => {
        if(Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        // после ввода данных окно закрывается
        setInputValue('');
        // сбрасывается value
        selectColor(colors[0].id);
        // при открытий окна, стоит по-умолчанию выбор на первый цвет
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка');
            return;
        }
        // фильтрую массив и выбираю тот цвет из json который выбрал пользователь,
        // сравниваю id
        setIsLoading(true);
        // перед тем как запрос отправить, у нас происходит загрузка.
        axios
            .post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor})
            // отправка запроса
            .then(({data}) => {
                // Получили ответ от сервера
                const color = colors.filter(c => c.id === selectedColor)[0];
                // фильтрую массив и выбираю тот цвет из json который выбрал пользователь,
                // сравниваю id
                const listObj = {...data, color, tasks: []};
                // Получили от back-end ответ, создали новый объект. 
                // Мы получили все свойства из ответа объекта data и добавили к нему color, цвет выбранный пользователем.
                onAdd(listObj);
                // Добавляем объект
                onClose();
                // Закрывает окно после того как сервер обработал.
            })
            .catch(() => {
                alert('Ошибка при добавлении списка!');
            })
            .finally(() => {
                setIsLoading(false);
                // после того как запрос завершится вне зависимости от ответа, загрузка завершится.
            });
        // POST один из методов http запроса. POST используется для отправки
        // данных к определённому ресурсу. Часто вызывает изменение состояния
        // или какие-то побочные эффекты на сервере.
    };

    return (
        <div className='add-list'>
            <List 
                onClick = {() => setVisiblePopup(true)}
                items= {[
                {
                    className: 'list-add__button',
                    icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>,
                    name: 'Добавить список'
                    }
                ]}
            />
            {visiblePopup && (
                <div className="add-list__popup">
                    <img 
                        onClick={onClose}
                        src={closeSvg} 
                        alt='Close_button' 
                        className='add-list__popup-closeBtn' 
                    />
                    <input 
                        value = {inputValue}
                        // Добавляют в value state
                        onChange={e => setInputValue(e.target.value)}
                        // Добавил функцию изменения, чтобы открылось поле ввода.
                        // e - просто событие
                        // target - это в каком месте происходит событие. 
                        //В target содержится цель.
                        // value - это значение.
                        className='field' 
                        type='text' 
                        placeholder='Название списка'
                    />
                    <div className='add-list__popup-colors'>
                        {colors.map(color => ( 
                            <Badge 
                                onClick={() => selectColor(color.id)} 
                                key={color.id} 
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />
                            ))}
                    </div>
                    <button onClick={addList} className='button'>
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            )}
        </div>

    );
};

export default AddList;