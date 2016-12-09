import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../TextInput';
test('Should render TextInput correctly', () => {
    const tree = renderer.create(
        <TextInput /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    