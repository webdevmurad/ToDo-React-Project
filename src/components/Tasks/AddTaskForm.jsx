import React, {useState} from 'react';
import axios from 'axios'


import addSvg from '../../assets/img/add.svg'

const AddTaskForm = ({list, onAddTask}) => {
    // Прокидываю сюда onAddTask
    const [visibleForm, setFormVisible] = useState(false);
    // Данное состояние скрывает и отображает наш блок добавления задач
    const [inputValue, setInputValue] = useState('');
    // Получает значение input
    const [isLoading, setIsLoading] = useState('');
    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    }
    // Данная фукнция скрывает и отображает меню, в зависимости от true или false

    const addTask = () => {
        // Начинаем функцию
        const obj = {
            "listId" : list.id,
            "text" : inputValue,
            "completed": false
            // Получаем объект
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj)
            .then(({data}) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            // Делаем запрос на добавление на сервер
            .catch(() => {
                alert('Ошибка при добавлении задачи!');
            })
            // На случай ошибки
            .finally(() => {
                setIsLoading(false);
                // Результат в любом случае
            })
    }

    return (
        <div className="tasks-form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks-form__new">
                    <img className="tasks-form__icon" src={addSvg} alt="Add icon"/>
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className="tasks-form__block">
                    <input 
                        value={inputValue}
                        className='field' 
                        type='text' 
                        placeholder='Текст задачи'
                        onChange = {e => setInputValue(e.target.value)}
                        // Получаем input value
                    />
                    <button disabled={isLoading} onClick={addTask} className='button'>
                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                        {/* Добавление тасков и прогрузка при ожиданий */}
                    </button>
                    <button onClick={toggleFormVisible} className='button button-grey'>
                        Отмена
                    </button>
                </div> 
            )}  
            {/* Скрывает или отображает меню */}
        </div>
        
    )
}

export default AddTaskForm

