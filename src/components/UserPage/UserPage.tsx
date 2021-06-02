import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// @ts-ignore
import LeftNav from './LeftNav.tsx';
// @ts-ignore
import Gallery from './Gallery.tsx';

const UserPage = () => {
    const history = useHistory();

    useEffect (() => {
        fetch('/user/verifySession')
        .then(data => data.json())
        .then(data => {
          if (data === 'failed') history.push('/');
        })
      }, [])

    return (
        <div id='user-wrapper'>
            <LeftNav />
            <Gallery />
        </div>
    )
}

export default UserPage;