import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import Header from '../Header';

it('renders with correctly header content', () => {
    const testRenderer = TestRenderer.create(
        <StaticRouter context={{}}>
            <Header></Header>
        </StaticRouter>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
});