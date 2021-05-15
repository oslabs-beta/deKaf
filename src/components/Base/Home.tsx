import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div >
            <h1>Welcome to deKaf!</h1><br />
            <p>What would you like to do?</p>
            <Link to="/login">click to login</Link><br/>
            <Link to="/signup">click to signup</Link>
        </div>
    )
}

export default Home;