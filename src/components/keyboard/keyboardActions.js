import {
  TOGGLE_KEYBOARD,
  KEYBOARD_UPDATE,
  KEYBOARD_REMOVE_LAST_CHAR,
  KEYBOARD_NEXT_ELEMENT
} from "./keyboardActionTypes";
export const toggleKeyboard = (data = {}) => ({
  type: TOGGLE_KEYBOARD,
  data
});

export const updateText = text => ({
  type: KEYBOARD_UPDATE,
  text
});

export const removeLastChar = () => ({
  type: KEYBOARD_REMOVE_LAST_CHAR
});

export const nextActive = () => ({
  type: KEYBOARD_NEXT_ELEMENT
})
