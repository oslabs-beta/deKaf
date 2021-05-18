import React from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => {
  return (
    <nav className='left-nav'>
      <Link><div className='left-option'>Account information</div></Link>
      <Link to='/user'><div className='left-option'>Broker overview</div></Link>
      <Link><div className='left-option'>Option 3</div></Link>
    </nav>
  )
}

export default LeftNav;