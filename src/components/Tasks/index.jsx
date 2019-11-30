import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

import AddTaskForm from './AddTaskForm'
import Task from './Task'

import editSvg from '../../assets/img/edit.svg';


import './Tasks.sass'


const Tasks = ({list, onEditTitle, onAddTask, onEditTask, onRemoveTask, withoutEmpty, onCompleteTask}) => {
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
            <Link to = {`/lists/${list.id}`}>
                <h2 style={{color: list.color.hex}} className='tasks-title'>
                    {list.name} 
                    <img onClick={editTitle} src={editSvg} alt="Edit icon"/>          
                </h2>
            </Link>

            <div className='tasks-items'>
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {/* Если у активно-выбранной задачи нет внутренних задач, они = 0, то выходит текст */}
                {list.tasks && list.tasks.map(task => (
                    <Task 
                        key={task.id} 
                        list={list} 
                        onEdit={onEditTask} 
                        onRemove={onRemoveTask}
                        onComplete = {onCompleteTask}
                        {...task}/>
                ))}

                <AddTaskForm 
                    key={list.id} 
                    list={list} 
                    onAddTask={onAddTask}/>
                {/* Также дальше прокидываем onAddTask */}
            </div>

        </div>
    );
}

export default Tasks;
