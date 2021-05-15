import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

// @ts-ignore
import NavBar from './Navbar.tsx';
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
        <div className = 'app-wrapper'>
            Component rendering test!
            <NavBar />
            <div className="content-container">
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/login" render={() => <Login />} />
                    <Route exact path="/signup" render={() => <Signup />} />
                    <Route exact path="/about" render={() => <About />} />
                    <Route exact path="/user" render={() => <UserPage />} />
                </Switch>
            </div>
            <nav>
                <div className = 'logo'>(Logo)</div>
                <div className = 'nav-right'>
                    <a href='#'>About</a>
                    <a href='#'>GitHub</a>
                </div>
            </nav>

            <div className = 'login-wrapper'>
                <div className = 'logo'>(Logo image will go here)</div>
                <div className = 'logo-caption'>A visualization tool for Kafka consumer metrics</div>

                <div className = 'login-container'>
                    <h3>Log in to deKaf</h3>
                    <hr />
                    <form id='login' action='/login' method='POST'>
                        <input id='user' name='user' placeholder='User name' type='text'></input>
                        <br />
                        <input id='password' name='password' placeholder='Password' type='text'></input>
                        <br />
                        <button id='submit' type='submit'>Log in</button>
                    </form>
                </div>

                <div className = 'new-user'>New to deKaf? <a href='#'>Learn more</a> or <a href='#'>create an account.</a></div>
            </div> 
        </div>
    )
}

export default App;