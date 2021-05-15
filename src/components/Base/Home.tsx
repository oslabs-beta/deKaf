import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div >
            Homepage!
            <Link to="/signup">login</Link>
        </div>
    )
}

export default Home;