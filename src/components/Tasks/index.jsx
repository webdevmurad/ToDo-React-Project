import React from 'react';
import axios from 'axios'

import AddTaskForm from './AddTaskForm'

import editSvg from '../../assets/img/edit.svg';


import './Tasks.sass'


const Tasks = ({list, onEditTitle, onAddTask}) => {
    // прокидываем onAddTask
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        // Создал функцию, где вызывается prompt, и записываются изменения прямо в переменную.
        if (newTitle) {
            // Проверяем, есть ли значение
            onEditTitle(list.id, newTitle);
            // Если есть, меняем состояние
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
            // Одновременно отправляем запрос на сервер
            .catch(() => {
                alert('Не удалось обновить название списка')
            });
            // Если произошла ошибка, то будет вот это сообщение
        }
        // Условие, если пользователь что-то ввел, только тогда вызывать эту функцию.
    }

    return (
        <div className='tasks'>
            <h2 className='tasks-title'>
                {list.name} 
                <img onClick={editTitle} src={editSvg} alt="Edit icon"/>          
            </h2>

            <div className='tasks-items'>
                {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {/* Если у активно-выбранной задачи нет внутренних задач, они = 0, то выходит текст */}
                {list.tasks.map(task => (
                    <div key={task.id} className="tasks-items__row">
                        <div className='checkbox'>
                            <input id={`task-${task.id}`} type='checkbox'/>
                            <label htmlFor={`task-${task.id}`}>
                                <svg 
                                    width="11" 
                                    height="8" 
                                    viewBox="0 0 11 8" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" 
                                    stroke="#000" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                                </svg>
                            </label>
                        </div>
                    <input readOnly value={task.text}/>
                </div>
                ))}

                <AddTaskForm list={list} onAddTask={onAddTask}/>
                {/* Также дальше прокидываем onAddTask */}
            </div>

        </div>
    );
}

export default Tasks;
