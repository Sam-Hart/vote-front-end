import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-dom/test-utils';

import {expect} from 'chai';
import {List} from 'immutable';
import Voting from '../../src/components/Voting';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const votingComponent = renderIntoDocument(
            <Voting pair={['The Castles of Burgundy', 'Trajan']} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(votingComponent, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('The Castles of Burgundy');
        expect(buttons[1].textContent).to.equal('Trajan');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const votingComponent = renderIntoDocument(
            <Voting pair={['The Castles of Burgundy', 'Trajan']} vote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(
            votingComponent,
            'button'
        );
        Simulate.click(buttons[0]);
        expect(votedWith).to.equal('The Castles of Burgundy');
    });

    it('disables buttons when user has voted', () => {
        const votingComponent = renderIntoDocument(
            <Voting pair={['Bora Bora', 'Macao']} hasVoted='Macao' />
        );
        const voteButtons = scryRenderedDOMComponentsWithTag(
            votingComponent,
            'button'
        );
        expect(voteButtons.length).to.equal(2);
        expect(voteButtons[0].hasAttribute('disabled')).to.equal(true);
        expect(voteButtons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const votingComponent = renderIntoDocument(
            <Voting pair={['Bora Bora', 'Macao']} hasVoted='Macao' />
        );
        const voteButtons = scryRenderedDOMComponentsWithTag(
            votingComponent,
            'button'
        );
        expect(voteButtons[1].textContent).to.contain('Voted');
    });

    it('renders as a pure component', () => {
        const pair = ['Bora Bora', 'Macao'];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Bora Bora');
        pair[0] = 'Trajan';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Bora Bora');
    });

    it('does update DOM when prop changes', () => {
        const pair = List.of('Bora Bora', 'Macao');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Bora Bora');
        const newPair = pair.set(0, 'Trajan');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Bora Bora');
    });

});
