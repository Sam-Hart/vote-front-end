import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Router, Route, hashHistory} from 'react-router-dom';
import App from './components/App';

const routes = <Route component={App} />;

ReactDOM.render(
    <HashRouter>{routes}</HashRouter>,
    document.getElementById('app')
);
