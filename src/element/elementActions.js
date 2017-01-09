import { INPUT_FIELD_CHANGE, ELEMENT_TOGGLE_MODAL, ELEMENT_INIT_STATE } from './elementAcitonTypes';

export const textInputChange = (elementIndex, setIndex) => ({
    type: INPUT_FIELD_CHANGE,
    elementIndex,
    setIndex
});


export const toggleModal = (elementIndex) => ({
    type: ELEMENT_TOGGLE_MODAL,
    elementIndex
});

export const INIT_STATE = () => ({
    type: ELEMENT_INIT_STATE
})
