import React from 'react';
// @ts-ignore
import LeftNav from './LeftNav.tsx';
// @ts-ignore
import Gallery from './Gallery.tsx';

const UserPage = () => {
    return (
        <div id='user-wrapper'>
            <LeftNav />
            <Gallery />
        </div>
    )
}

export default UserPage;