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
});
