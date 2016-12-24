import { KEYBOARD_HEIGHT_CHANGE } from './controllerActionTypes'; 

export const keyboardHeightChange = (height) => (
    {
        type: KEYBOARD_HEIGHT_CHANGE,
        height
    }
)