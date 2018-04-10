import React from 'react';
import PropTypes from 'prop-types';
import Winner from './Winner';
import Vote from './Vote';

class Voting extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            {this.props.winner ?
                <Winner ref='winner' winner={this.props.winner} /> :
                <Vote {...this.props} />
            }
        </div>;
    }
}

Voting.propTypes = {
    winner: PropTypes.string,
};

export default Voting;
