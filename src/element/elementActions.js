import { INPUT_FIELD_CHANGE, ELEMENT_TOGGLE_MODAL, ELEMENT_INIT_STATE } from './elementAcitonTypes';

export const textInputChange = (elementId, setIndex) => ({
    type: INPUT_FIELD_CHANGE,
    elementId,
    setIndex
});


export const toggleModal = (elementId) => ({
    type: ELEMENT_TOGGLE_MODAL,
    elementId
});

export const INIT_STATE = () => ({
    type: ELEMENT_INIT_STATE
})
