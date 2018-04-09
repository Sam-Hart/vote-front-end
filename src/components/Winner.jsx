import React from 'react';
import PropTypes from 'prop-types';

class Winner extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='winner'>
            Winner is {this.props.winner}!
        </div>;
    }
}

Winner.propTypes = {
    winner: PropTypes.string
};

export default Winner;
