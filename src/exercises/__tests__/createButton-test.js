import React from 'react';
import renderer from 'react-test-renderer';
import CreateButton from '../CreateButton';
test('Should render CreateButton correctly', () => {
    const tree = renderer.create(
        <CreateButton /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    