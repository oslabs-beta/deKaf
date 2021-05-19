import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='top-nav' id='top-nav-flex'>
            <div className='logo'><Link to='/'>(Logo)</Link></div>
            <div className='nav-right'>
                <Link to='/about'>About</Link>
                <Link to='/login'>Log in</Link>
                <a href='https://github.com/oslabs-beta/deKaf' target='_blank'>GitHub</a>
            </div>
        </nav>
    )
}

export default NavBar;