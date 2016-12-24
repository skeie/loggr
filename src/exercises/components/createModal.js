import React from 'react';
import Modal from './modal';
import CreateExercise from './createExercise';
const CreateModal = (props) => (
    <Modal {...props}>
        <CreateExercise {...props} />
    </Modal>
);

export default CreateModal;