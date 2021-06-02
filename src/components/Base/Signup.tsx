import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {

    const history = useHistory();
    const [info, setInfo] = useState(null);

    useEffect (() => {
        fetch('/user/verifySession')
        .then(data => data.json())
        .then(data => {
          if (data === 'success') history.push('/user');
        })
      }, [])

    function onUserLogin(e) {
        e.preventDefault();

        const nameInput = document.getElementById('user') as HTMLInputElement;
        const pswdInput = document.getElementById('password') as HTMLInputElement;
        const pswdConfInput = document.getElementById('passwordConf') as HTMLInputElement;

        if (nameInput.value === '') return setInfo('Please enter a valid username.');
        if (pswdInput.value === '') return setInfo('Please enter a valid password.');
        if (pswdConfInput.value === '') return setInfo('Please confirm your password.');

        if (pswdInput.value !== pswdConfInput.value) {
            pswdInput.value = '';
            pswdConfInput.value = '';
            return setInfo('Passwords don\'t match!');
        }

        console.log('Signing up ', nameInput.value)

        fetch('/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({ username: nameInput.value, password: pswdInput.value })
        })
            .then(response => response.json())
            .then(data => {
                switch (data) {
                    case 'userExists':
                        setInfo('Username is already taken!');
                        nameInput.value = '';
                        pswdInput.value = '';
                        pswdConfInput.value = '';
                        break;
                    case 'success':
                        nameInput.value = '';
                        pswdInput.value = '';
                        pswdConfInput.value = '';
                        setInfo('Account created!')
                        setTimeout(() => {
                            setInfo('');
                            history.push('/user');
                        }, 1000)
                        break;
                    default:
                        throw new Error('Invalid Signup: Server ERROR');
                }
            })
            .catch((error) => {
                console.error('Error when POST-fetching for signup: ', error);
            })
    }

    return (
        <div className='login-wrapper'>
            <div className='logo'><img src='https://i.imgur.com/nWW4UjX.png'/></div>
            {/* <div className='logo-caption'>A visualization tool for Kafka consumer metrics</div> */}

            <div className='login-container'>
                <h3>Create a deKaf account</h3>
                <hr />
                <div className='login-signup-form'>
                    <input id='user' name='user' placeholder='Username' type='text' />
                    <br />
                    <input id='password' name='password' placeholder='Password' type='password' />
                    <br />
                    <input id='passwordConf' name='passwordConf' placeholder='Confirm password' type='password' />
                    <br />
                    <button id='signup-submit' onClick={onUserLogin}>Create account</button>
                </div>
                <div className='info'>{info}</div>
            </div>

            <div className='new-user'>Already have an account? <Link to='/login'>Log in here</Link>.</div>
        </div>
    )
}

export default Signup;