import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import NavTab from '../NavTab';

it('renders correctly with given prop active', () => {
    const tabList = [
        { label: 'Test1', value: 0 },
        { label: 'Test2', value: 1 },
        { label: 'Test3', value: 2 },
    ];

    const testRenderer = TestRenderer.create(
        <NavTab active={0} tabList={[]} onTabChange={jest.fn()}></NavTab>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('renders correctly with given prop tabList', () => {
    const tabList = [
        { label: 'Test1', value: 0 },
        { label: 'Test2', value: 1 },
        { label: 'Test3', value: 2 },
    ];

    const testRenderer = TestRenderer.create(
        <NavTab active={0} tabList={tabList} onTabChange={jest.fn()}></NavTab>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('renders different active tab by click tab item', () => {
    const tabList = [
        { label: 'Test1', value: 0 },
        { label: 'Test2', value: 1 },
        { label: 'Test3', value: 2 },
    ];
    const testRenderer = TestRenderer.create(
        <NavTab active={0} tabList={tabList} onTabChange={jest.fn()}></NavTab>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
});