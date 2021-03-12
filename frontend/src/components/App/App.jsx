import React, { Component } from 'react';
import Header from '../Header';
import SearchBar from '../SearchBar';
import TaskAddBar from '../TaskAddBar';
import TaskFilter from '../TaskFilter';
import Tasks from '../Tasks';
import './App.css';

import axios from 'axios';

export default class App extends Component {

    state = {
        tasks: [],
        searchText: '',
        filter: 'all'
    };

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/')
            .then(response => {
                this.setState({ tasks: response.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteTask = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/${id}/`)
            .then(response => {
                this.setState(({ tasks }) => {
                    const idx = tasks.findIndex((e) => e.id === id);
                    return {
                        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    addTask = (text) => {
        axios
            .post('http://127.0.0.1:8000/api/', {
                name: text,
                done: false,
                import: false
            })
            .then(response => {
                this.setState(({ tasks }) => {
                    return {
                        tasks: [...tasks, response.data]
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    switchProperty(arr, id, propName) {
        const idx = arr.findIndex((e) => e.id === id);
        const oldTask = arr[idx];
        const newTask = { ...oldTask, [propName]: !oldTask[propName] };

        axios
            .put(`http://127.0.0.1:8000/api/${id}/`, newTask)
            .catch(err => {
                console.log(err);
            });

        return [
            ...arr.slice(0, idx),
            newTask,
            ...arr.slice(idx + 1)
        ]
    }

    switchDoneState = (id) => {
        this.setState(({ tasks }) => {
            return {
                tasks: this.switchProperty(tasks, id, 'done')
            };
        });
    };

    switchImportantState = (id) => {
        this.setState(({ tasks }) => {
            return {
                tasks: this.switchProperty(tasks, id, 'important')
            };
        });
    };

    onSearchChange = (searchText) => {
        this.setState({ searchText });
    };

    search(tasks, text) {
        if (text.length === 0) {
            return tasks;
        };

        return tasks.filter((t) => {
            return t.name
                .toLowerCase()
                .indexOf(text.toLowerCase()) > -1;
        });
    };

    onFilterClick = (filter) => {
        this.setState({ filter });
    };

    filter(tasks, filter) {
        switch (filter) {
            case 'all':
                return tasks;
            case 'active':
                return tasks.filter((t) => !t.done);
            case 'done':
                return tasks.filter((t) => t.done);
            default:
                return tasks;
        }
    };

    render() {
        const { tasks, searchText, filter } = this.state;
        const visibleTasks = this.filter(
            this.search(tasks, searchText), filter);

        const doneCount = tasks.filter((e) => e.done).length;
        const todoCount = tasks.length - doneCount;

        return (
            <div className='app'>
                <Header toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchBar
                        onSearchChange={this.onSearchChange} />
                    <TaskFilter
                        filter={filter}
                        onFilterClick={this.onFilterClick} />
                </div>
                <Tasks
                    tasks={visibleTasks}
                    onDeleteClick={this.deleteTask}
                    onDoneClick={this.switchDoneState}
                    onImportantClick={this.switchImportantState} />
                <TaskAddBar
                    onAddClick={this.addTask} />
            </div>
        );
    }
}
