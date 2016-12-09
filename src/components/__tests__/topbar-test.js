import React from 'react';
import renderer from 'react-test-renderer';
import Topbar from '../Topbar';
test('Should render Topbar correctly', () => {
    const tree = renderer.create(
        <Topbar /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    