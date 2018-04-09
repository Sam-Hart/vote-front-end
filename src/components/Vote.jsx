import React from 'react';
import PropTypes from 'prop-types';

class Vote extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getPair() {
        return this.props.pair || [];
    }

    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry) {
        return this.props.hasVoted === entry;
    }

    render() {
        return <div className='voting'>
            {this.getPair().map(entry =>
                <button
                    key={entry}
                    disabled={this.isDisabled()}
                    onClick={() => this.props.vote(entry)}>
                    <h1>{entry}</h1>
                    {this.hasVotedFor(entry) ?
                        <div className='label'>Voted</div> :
                        undefined}
                </button>
            )}
        </div>;
    }
}

Vote.propTypes = {
    pair: PropTypes.array,
    hasVoted: PropTypes.bool,
    vote: PropTypes.func
};

export default Vote;
