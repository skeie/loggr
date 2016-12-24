import { INPUT_FIELD_CHANGE, ELEMENT_TOGGLE_MODAL } from './elementAcitonTypes';

export const textInputChange = (elementIndex, setIndex) => ({
    type: INPUT_FIELD_CHANGE,
    elementIndex,
    setIndex
});


export const toggleModal = (elementIndex) => ({
    type: ELEMENT_TOGGLE_MODAL,
    elementIndex
});
