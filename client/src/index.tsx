import React    from 'react';
import ReactDOM from 'react-dom';
import _App     from './components/App.tsx';

const appContainer = document.getElementById('app');

appContainer
    ? ReactDOM.render(<_App />, appContainer)
    : null;
