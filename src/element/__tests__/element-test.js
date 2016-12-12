import React from 'react';
import renderer from 'react-test-renderer';
import Element from '../Element';
test('Should render Element correctly', () => {
    const tree = renderer.create(
        <Element /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    