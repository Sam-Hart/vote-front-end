import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-dom/test-utils';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {
    it('renders entries with vote counts or zero', () => {
        const pair = List.of('Trajan', 'Macao');
        const tally = Map({'Trajan': 10, 'Macao': 72});
        const voteResults = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        );
        const entries = scryRenderedDOMComponentsWithClass(voteResults, 'entry');
        const [trajan, macao] = entries.map(e => e.textContent);
        expect(entries.length).to.equal(2);
        expect(trajan).to.contain('Trajan');
        expect(trajan).to.contain('10');
        expect(macao).to.contain('Macao');
        expect(macao).to.contain('72');
    });

    it('invokes the next callback when next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;
        const pair = List.of('Trajan', 'Macao');
        const voteResults = renderIntoDocument(
            <Results pair={pair}
                tally={Map()}
                next={next}
            />
        );
        Simulate.click(ReactDOM.findDOMNode(voteResults.refs.next));
        expect(nextInvoked).to.equal(true);
    });

    it('renders the winner when there is one', () => {
        const voteResults = renderIntoDocument(
            <Results winner='Macao'
                pair={['Trajan', 'Macao']}
                tally={Map()}
            />
        );
        const winner = ReactDOM.findDOMNode(voteResults.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Macao');

    });
});
