import React from 'react';
import renderer from 'react-test-renderer';
import Modal from '../Modal';
test('Should render Modal correctly', () => {
    const tree = renderer.create(
        <Modal /> 
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
    