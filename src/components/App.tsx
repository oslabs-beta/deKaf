import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

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
    // const [session, setSession] = useState(null);

    // useEffect (() => {
    //     fetch('/user/verifySession')
    //     .then(data => data.json()
    //     .then(data => {
    //     //   check for session on server, return session id or no session
    //     //   if (data.message) return;
    //     //   if (data.ssid) setSession(data.ssid)
    //     }))
    //   }, [session])

    // return (
    //     <div className="app-container">
    //         Component rendering test!
    //     </div>
    // )

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