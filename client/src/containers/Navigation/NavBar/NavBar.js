import React from 'react';

import classes from './NavBar.module.css';

const NavBar = () => {
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

    return (
    <header className={classes.NavBarHeader}>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/"onClick={() => logoutHandler()}>Logout</a></li>
            </ul>
        </nav>
    </header>
    )
}

export default NavBar;