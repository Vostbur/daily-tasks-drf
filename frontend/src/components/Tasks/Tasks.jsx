import React from 'react';
import TaskItem from '../TaskItem';
import './Tasks.css';

const Tasks = ({ tasks, onDeleteClick,
                 onDoneClick, onImportantClick }) => {
    const taskList = tasks.map((t) => {
        const { id, ...items } = t;

        return (
            <li className='list-group-item' key={id}>
                <TaskItem
                    {...items}
                    onDeleteClick={() => onDeleteClick(id)}
                    onDoneClick={() => onDoneClick(id)}
                    onImportantClick={() => onImportantClick(id)} />
            </li>
        );
    });

    return (
        <ul className='list-group tasks'>
            {taskList}
        </ul>
    );
};

export default Tasks;
