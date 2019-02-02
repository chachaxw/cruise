import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import Menu from '../Menu';

it('renders with given prop menu', () => {
    const test = [
        { to: '/test1', icon: 'icon-test1', name: 'TEST1' },
        { to: '/test2', icon: 'icon-test2', name: 'TEST2' },
        { to: '/test3', icon: 'icon-test3', name: 'TEST3' },
        { to: '/test4', icon: 'icon-test4', name: 'TEST4' },
    ];

    const testRenderer = TestRenderer.create(
        <StaticRouter context={{}}>
            <Menu menu={test}></Menu>
        </StaticRouter>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
});