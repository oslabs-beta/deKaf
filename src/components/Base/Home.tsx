import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id='home-wrapper'>
            <div className='banner'>
                <div className='logo'>(Logo image will go here)</div>
                <div className='logo-caption'>A visualization tool for Kafka consumer metrics</div>
                <div id='home-options'>
                    <Link to='/about'>
                        <button>
                            Learn more
                        </button>
                    </Link>
                    <Link to='/login'>
                        <button>
                            Log in
                        </button>
                    </Link>
                    <Link to='/signup'>
                        <button>
                            Sign up
                        </button>
                    </Link>
                </div>
            </div>
            
            <div id='home-info'>
                <div className='home-info-box'>
                    <div className='home-info-icon'>(Flat icon 1)</div>
                    <h3>Overview item 1</h3>
                    <p> Lorem ipsum etc.</p>
                </div>
                <div className='home-info-box'>
                    <div className='home-info-icon'>(Flat icon 2)</div>
                    <h3>Overview item 2</h3>
                    <p>Can I offer you a nice egg in this trying time?</p>
                </div>
                <div className='home-info-box'>
                    <div className='home-info-icon'>(Flat icon 3)</div>
                    <h3>Overview item 3</h3>
                    <p>Arma virumque cano...</p>
                </div>
            </div>
        </div>
    )
}

export default Home;