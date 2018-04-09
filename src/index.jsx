import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['The Castles of Burgundy', 'Trajan'];

ReactDOM.render(
    <Voting pair={pair} winner='The Castles of Burgundy' />,
    document.getElementById('app')
);
