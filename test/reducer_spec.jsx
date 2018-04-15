import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Bora Bora', 'Macao'),
                    tally: Map({'Bora Bora': 9})
                })
            })
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {'Bora Bora': 9}
            }
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Bora Bora', 'Macao'],
                    tally: {
                        'Bora Bora': 9
                    }
                }
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {'Bora Bora': 9}
            }
        }));
        expect(nextState).to.equal(fromJS(action.state));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Bora Bora', 'Macao'],
                    tally: {'Bora Bora': 9}
                }
            }
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {'Bora Bora': 9}
            }
        }));
    });

    it('handles VOTE by setting hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {Macao: 12}
            }
        });
        const action = {type: 'VOTE', entry: 'Bora Bora'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {Macao: 12}
            },
            hasVoted: 'Bora Bora'
        }));
    });

    it('does not set hasVoted for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {Macao: 98}
            }
        });
        const action = {type: 'VOTE', entry: 'The Castles of Burgundy'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {Macao: 98}
            }
        }));
    });

    it('removes hasVoted on SET_STATE if pair changes', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao'],
                tally: {'Bora Bora': 944}
            },
            hasVoted: 'Bora Bora'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['The Castles of Burgundy', 'Trajan']
                }
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Castles of Burgundy', 'Trajan']
            }
        }));
    });
});
