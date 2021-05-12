import React from 'react'; 
import { render } from 'react-dom'; 
import App from './components/App.tsx';
// import styles for webpack, this is where we'd import a logo, and append it
import './styles.css';

render(<App />, document.getElementById('root'));