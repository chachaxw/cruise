import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import History from '../History';

it('renders correctly with given prop history', () => {
    const test = [
        { id: 0, name: 'Test Agent1', status: 'Test Status1' },
        { id: 1, name: 'Test Agent2', status: 'Test Status2' },
        { id: 2, name: 'Test Agent3', status: 'Test Status3' },
    ];

    const testRenderer = TestRenderer.create(
        <StaticRouter context={{}}>
            <History history={test}></History>
        </StaticRouter>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
});