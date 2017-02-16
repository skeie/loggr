import React from 'react';
import Modal from './modal';
import EditExercise from './editExercise';

const EditModal = (props) => (
    <Modal isEdit header="Edit" {...props}>
        <EditExercise {...props} />
    </Modal>
);

export default EditModal;