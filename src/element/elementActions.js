import { INPUT_FIELD_CHANGE } from './elementAcitonTypes';

export const textInputChange = (elementIndex, setIndex) => ({
    type: INPUT_FIELD_CHANGE,
    elementIndex,
    setIndex
});
