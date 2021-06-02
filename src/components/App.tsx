import React, { useEffect, useState } from 'react';
import {select} from 'd3-selection';
// @ts-ignore
import Vis from './Vis.tsx';
import { Route, Switch } from 'react-router-dom';

// @ts-ignore
import NavBar from './Navbar.tsx';
// @ts-ignore
import TopNav from './UserPage/TopNav.tsx';
// @ts-ignore
import Home from './Base/Home.tsx';
// @ts-ignore
import Login from './Base/Login.tsx';
// @ts-ignore
import Signup from './Base/Signup.tsx';
// @ts-ignore
import About from './Base/About.tsx';
// @ts-ignore
import UserPage from './UserPage/UserPage.tsx';

const App = () => {

    return (
        <div className='app-wrapper'>
            {/* <NavBar /> */}
            <Switch>
                <Route path='/user' render={() => <TopNav />} />
                <Route path='/details' render={() => <TopNav />} />
                <Route path='/history' render={() => <TopNav />} />
                <Route path='/' render={() => <NavBar />} />
            </Switch>
            <div className="content-container">
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/login" render={() => <Login />} />
                    <Route exact path="/signup" render={() => <Signup />} />
                    <Route exact path="/about" render={() => <About />} />
                    <Route path="/user" render={() => <UserPage />} />
                    <Route path='/details' render={() => <UserPage />} />
                    <Route path='/history' render={() => <UserPage />} />
                </Switch>
            </div>
        </div>
    )
}

export default App;