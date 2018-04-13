import React from 'react';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';
import {Route, Switch} from 'react-router-dom';
import {VotingContainer} from './Voting';
import {ResultsContainer} from './Results';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <React.Fragment>
            <Switch>
                <Route
                    path='/results'
                    render={() => <ResultsContainer {...this.props} />}
                />
                <Route
                    path='/'
                    render={() => <VotingContainer {...this.props} />}
                />
            </Switch>
        </React.Fragment>;
    }
}

App.propTypes = {
    children: PropTypes.any
};

export default App;
