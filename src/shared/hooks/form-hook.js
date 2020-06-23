import {useCallback, useReducer} from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.id) {
          formValid = formValid && action.isValid;
        } else {
          formValid = formValid && state.inputs[inputId];
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formValid
      };
    }
    default:
      return state;
  }
}


const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((inputId, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId,
      value,
      isValid
    });
  }, []);
  return [formState, inputHandler];
}

export {useForm};
