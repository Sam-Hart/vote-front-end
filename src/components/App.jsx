import React from 'react';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';
import {Route, Switch} from 'react-router-dom';
import {VotingContainer} from './Voting';
import Results from './Results';

const pair = List.of('Trajan', 'Macao');
const tally = Map({'Trajan': 7, 'Macao': 9});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <React.Fragment>
            <Switch>
                <Route
                    path='/results'
                    render={() => <Results pair={pair} tally={tally} />}
                />
                <Route
                    path='/'
                    render={() => {
                        <VotingContainer {...this.props} />;
                    }}
                />
            </Switch>
        </React.Fragment>;
    }
}

App.propTypes = {
    children: PropTypes.any
};

export default App;
