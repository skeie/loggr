import React from 'react';
import renderer from 'react-test-renderer';
import Index from '../Index';
test('Should render Index correctly', () => {
    const tree = renderer.create(
        <Index /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    