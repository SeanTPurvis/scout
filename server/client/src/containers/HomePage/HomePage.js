import React from 'react';

import classes from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={classes.HomePage}>
            <h3>Welcome To Scout</h3>
            <a href="login">Click here to Login</a>
            <br/>
            <br/>
            <a href="register">Click here to Register</a>
        </div>
    )
}

export default HomePage;