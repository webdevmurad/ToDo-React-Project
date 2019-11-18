import React, {useState} from 'react';
import List from '../List';
import Badge from '../Badge';
import closeSvg from '../../assets/img/close.svg';

import './AddListButton.sass';

const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    // блок с инпутом и цветами
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');
    // Хук который принимает value у инпута как состояние.

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка');
            return;
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name
        // фильтрую массив и выбираю тот цвет из json который выбрал пользователь,
        // сравниваю id
        onAdd({ id: Math.random(), name: inputValue, color});
    }

    console.log(inputValue);

    return (
        <div className='add-list'>
            <List 
                onClick = {() => setVisiblePopup(!visiblePopup)}
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
            {visiblePopup && <div className="add-list__popup">
                <img 
                    onClick={() => setVisiblePopup(false)}
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
                    {colors.map(color => 
                        (<Badge 
                            onClick={() => selectColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                        />
                        ))}
                </div>
                <button onClick={addList} className='button'>Добавить</button>
            </div>}
        </div>

    );
};

export default AddList;