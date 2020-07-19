import {useCallback, useReducer} from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue
        if (inputId === action.id) {
          formValid = formValid && action.isValid;
        } else {
          formValid = formValid && state.inputs[inputId].isValid;
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
    case 'SET_DATA': {
      return {
        inputs: action.inputs,
        isValid: action.isFormValid 
      }
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

  const setFormData = useCallback((inputData, formValidity) => {
    console.log(inputData, formValidity);
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      isFormValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
}

export {useForm};
