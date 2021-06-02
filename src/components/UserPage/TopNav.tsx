import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const TopNav = () => {
    const history = useHistory();

    const logout = () => {
        fetch('/user/logout', { method: 'POST', credentials: 'include' })
        .then(data => data.json())
        .then(() => history.push('/'))
        .catch(err => console.log('ERROR LOGGING OUT: ', err))
    }

    return (
        <nav className='top-nav' id='top-nav-fixed'>
            <div className='logo'><Link to='/'><img src='https://i.imgur.com/r1RbvKv.png'/></Link></div>
            <div className='nav-right'>
                <Link to='/about'>About</Link>
                <button className='logout' onClick={logout}>Logout</button>
                <a href='https://github.com/oslabs-beta/deKaf' target='_blank'>GitHub</a>
            </div>
        </nav>
    )
}

export default TopNav;