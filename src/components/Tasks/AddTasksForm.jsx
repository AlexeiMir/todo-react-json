import React from 'react';
import axios from 'axios'
import './Tasks.scss'

import addSvg from '../../assets/img/add.svg'

const AddTasksForm = ({list,onAddTask}) => {
    const [visibleForm,setFormVisible] = React.useState(false)
    const [inputValue,setInputValue] = React.useState('')
    const [isLoading,setIsLoading] = React.useState('')

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios.post("/tasks",obj).then(({data}) => {
            onAddTask(data,list.id)
            toggleFormVisible()
        }).catch(() => alert("Ошибка при добавлении задачи"))
            .finally(() => setIsLoading(false) )

    }

    return (
        <div className="tasks__form">
            {!visibleForm ? (<div className="tasks__form-new">
                <img onClick={toggleFormVisible} src={addSvg} alt="Add task"/>
                <span>Новая задача</span>
            </div>)
            : (<div className="tasks__form-block">
                    <input type="text" value={inputValue}
                           className="field"
                           placeholder="Текст задачи"
                           onChange={(e) => setInputValue(e.currentTarget.value)}/>
                    <button className="button" disabled={isLoading} onClick={addTask}>
                        {isLoading ? "Добавление ..." : "Добавить задачу"}
                    </button>
                    <button className="button button--grey" onClick={toggleFormVisible}>Отмена</button>
                </div>)
            }
        </div>
    );
};

export default AddTasksForm;