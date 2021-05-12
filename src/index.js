import React from 'react'; 
import { render } from 'react-dom'; 
import App from './components/App.js';
// import styles for webpack, this is where we'd import a logo, and append it
import styles from './styles.css';

render(<App />, document.getElementById('root')); 