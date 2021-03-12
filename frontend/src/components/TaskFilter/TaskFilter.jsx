import React, { Component } from 'react';
import './TaskFilter.css';

export default class TaskFilter extends Component {

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ];

    render() {
        const { filter, onFilterClick } = this.props;

        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name;
            const classFilterButtons = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button type='button'
                    className={`btn ${classFilterButtons}`}
                    key={name}
                    onClick={() => onFilterClick(name)}>
                    {label}
                </button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
