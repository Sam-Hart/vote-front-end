import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Router, Route, hashHistory} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Bora Bora', 'Macao'],
            tally: {'Bora Bora': 12}
        }
    }
});

const routes = <Route component={App} />;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>{routes}</HashRouter>
    </Provider>,
    document.getElementById('app')
);
