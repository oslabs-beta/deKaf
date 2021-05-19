import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div id='about-wrapper'>
            <div className='banner' id='about-banner'>
                <div id='about-banner-content'>
                    <div id='about-banner-left'>
                        <h1>Upgrade your Kafka experience with deKaf</h1>
                        <p><span>deKaf</span> is a data visualization tool that allows you to easily view current and past activity on your Kafka brokers.</p>
                    </div>

                    <div id='about-banner-right'>
                        <div>(Screenshot of some cool visualizations)</div>
                    </div>
                </div>
                {/* <div className='logo'>(Logo image will go here)</div>
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
                </div> */}
            </div>

            <div className='panel' id='how-to-use-panel'>
                <h2>How to use deKaf</h2>
                <div className='panel-content'>
                    <div className='panel-left'>
                        <p>Some kind of explanation of how to use deKaf</p>
                    </div>

                    <div className='panel-right'>
                        <div>Screenshot or whatever</div>
                    </div>
                </div>
            </div>

            <div className='panel'>
                <h2>Another panel</h2>
                <div className='panel-content'>
                    <div className='panel-left'>
                        <p>Content of another panel</p>
                    </div>

                    <div className='panel-right'>
                        <p>Display of another panel</p>
                    </div>
                </div>
            </div>

            <div className='panel'>
                <h2>Contributors</h2>
                <div>
                    This one will be styled somewhat differently, with a grid of team member headshots, names, GitHub/LinkedIn links, etc.
                </div>
            </div>
        </div>
    )
}

export default About;