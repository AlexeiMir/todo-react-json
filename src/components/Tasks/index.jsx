import React from 'react';
import axios from 'axios'
import './Tasks.scss'
import editeSvg from '../../assets/img/edit.svg'
import AddTasksForm from "./AddTasksForm";
import Task from "./Task";
import {Link} from "react-router-dom";


const Tasks = ({list, onEditeTitle,onAddTask,onRemoveTask,onEditeTask,onCompleteTask,withoutEmpty}) => {

    const editeTitle = () => {
        const newTitle = window.prompt("Введите новый заголовок", list.name)
        if (newTitle) {
            onEditeTitle(newTitle, list.id)
            axios.patch('/lists' + list.id, {name: newTitle})
                .catch(() => console.log("Не удалось обновить название списка"))
        }
    }


    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
            <h2 style={{color:list.color.hex}} className="tasks__title">{list.name}
                <img onClick={editeTitle} src={editeSvg} alt="Edite title"/>
            </h2>
            </Link>
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map((task) => (
                    <Task
                    key={task.id}
                    list={list}
                    {...task}
                    onRemove={onRemoveTask}
                    onEdite={onEditeTask}
                    onComplete={onCompleteTask}
                    />
                    )
                )}
            <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    );
};

export default Tasks;