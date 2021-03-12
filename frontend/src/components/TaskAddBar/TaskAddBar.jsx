import React, { Component } from 'react';
import './TaskAddBar.css';

export default class TaskAddBar extends Component {

    state = {
        name: ''
    };

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddClick(this.state.name);
        this.setState({
            name: ''
        });
    };

    render() {
        return (
            <form className='task-add-bar d-flex'
                onSubmit={this.onSubmit} >
                <input type='text'
                    className='form-control'
                    onChange={this.onNameChange}
                    placeholder='what needs to be done'
                    value={this.state.name} />
                <button className='btn btn-outline-secondary'>
                    <i className="fa fa-pencil" />
                </button>
            </form>
        )
    }
}