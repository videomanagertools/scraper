import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { configureStore } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(<App store={store} />, document.getElementById('root'));
