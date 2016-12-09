import React from 'react';
import renderer from 'react-test-renderer';
import Progressbar from '../Progressbar';
test('Should render Progressbar correctly', () => {
    const tree = renderer.create(
        <Progressbar /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    