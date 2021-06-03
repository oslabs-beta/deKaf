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
                        <div><img width='50%' src='https://i.imgur.com/XF8Hnic.gif' /></div>
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
                        <p>Using deKaf is easy. Once you've signed in or created an account, you'll be asked to provide the port where your Kafka server is running, as well as a few details about the Kafka topics you'd like to monitor. You can even choose to test your Kafka instance with random data, to make sure it's functioning properly.</p>
                        <p>On the Metrics Overview page, you can easily select which category you'd like to monitor: Topic, Messages, Consumer, or Producer. deKaf will connect to your Kafka instance and render your metrics dynamically via D3, updating regularly to make sure you have access to the latest data.</p>
                    </div>

                    <div className='panel-right'>
                        <div><img width='100%' src='https://i.imgur.com/NoIubOI.png'/></div>
                    </div>
                </div>
            </div>

            {/* <div className='panel'>
                <h2>Another panel</h2>
                <div className='panel-content'>
                    <div className='panel-left'>
                        <p>Content of another panel</p>
                    </div>

                    <div className='panel-right'>
                        <p>Display of another panel</p>
                    </div>
                </div>
            </div> */}

            <div className='panel'>
                <h2>Contributors</h2>
                <div id='contributors'>
                    <p>Achille Perducat | <a href='https://github.com/Achilleees'>Github</a> | <a href='https://www.linkedin.com/in/achille-perducat/'>LinkedIn</a></p>
                    <p>Billy Hepfinger | <a href='https://github.com/bulknskull/'>Github</a> | <a href='https://www.linkedin.com/in/billy-hepfinger'>LinkedIn</a></p>
                    <p>Jake Song | <a href='https://github.com/jakesongweb'>Github</a></p>
                    <p>Mike Feldman | <a href='https://github.com/mikeFeldman15'>Github</a> | <a href='https://www.linkedin.com/in/michael-feldman-eit-a82997106/'>LinkedIn</a></p>
                    <p>Noah Mattingly | <a href='https://github.com/ohaxn'>Github</a> | <a href='https://www.linkedin.com/in/noah-mattingly/'>LinkedIn</a></p>
                </div>
            </div>
        </div>
    )
}

export default About;