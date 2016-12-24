import React from 'react';
import Modal from './modal';
import EditExercise from './editExercise';

const EditModal = (props) => (
    <Modal {...props}>
        <EditExercise {...props} />
    </Modal>
);

export default EditModal;