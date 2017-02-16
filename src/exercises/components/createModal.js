import React from 'react';
import Modal from './modal';
import CreateExercise from './createExercise';
const CreateModal = (props) => (
    <Modal header="Title your workout" {...props}>
        <CreateExercise {...props} />
    </Modal>
);

export default CreateModal;