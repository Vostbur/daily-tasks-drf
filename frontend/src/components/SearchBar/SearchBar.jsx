import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {

    state = {
        searchText: ''
    };

    onSearchChange = (e) => {
        const searchText = e.target.value;
        this.setState({ searchText });
        this.props.onSearchChange(searchText);
    };

    render() {
        return (
            <input
                className='form-control search-input'
                placeholder='type to search'
                value={this.state.searchText}
                onChange={this.onSearchChange} />
        );
    }
};
