import React, { useEffect, useState } from 'react';

const App = () => {
    // Add code here

    // return (
    //     <div className="app-container">
    //         Component rendering test!
    //     </div>
    // )

    return (
        <div className = 'app-wrapper'>
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