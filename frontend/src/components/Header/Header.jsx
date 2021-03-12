import React from 'react';
import './Header.css';

const Header = ({ toDo, done }) => {
    return (
        <div className='header d-flex'>
            <h1>Daily Tasks</h1>
            <h2>{toDo} more to do, {done} done</h2>
        </div>
    )
};

export default Header;