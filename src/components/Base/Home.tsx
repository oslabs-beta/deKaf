import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id='home-wrapper'>
            <div className='banner'>
                <div className='logo'><img height='100%' src='https://i.imgur.com/nWW4UjX.png'/></div>
                <div className='logo-caption'>A web-based visualization tool for Kafka consumer metrics</div>
                <div id='home-options'>
                    <Link to='/about'>
                        <button id='learn-button'>
                            Learn more
                        </button>
                    </Link>
                    <Link to='/login'>
                        <button>
                            Log in
                        </button>
                    </Link>
                    <Link to='/signup'>
                        <button id='signup-button'>
                            Sign up
                        </button>
                    </Link>
                </div>
            </div>
            
            <div id='home-info'>
                <div className='home-info-box'>
                    <div className='home-info-icon'><img min-width='80px' width='50%' src='https://i.imgur.com/7H2M39A.png'/></div>
                    <h3>Intuitive</h3>
                    <p>Easily view key metrics on your Kafka instance with our intuitive web GUI.</p>
                </div>
                <div className='home-info-box'>
                    <div className='home-info-icon'><img min-width='80px' width='50%' src='https://i.imgur.com/zAAVWb0.png'/></div>
                    <h3>Lightweight</h3>
                    <p>No installation required; just enter your information and start using deKaf!</p>
                </div>
                <div className='home-info-box'>
                    <div className='home-info-icon'><img min-width='80px' width='50%' src='https://i.imgur.com/YOFpmB9.png'/></div>
                    <h3>Real-time</h3>
                    <p>Metrics update automatically as long as you're signed in, so you won't miss a beat.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;