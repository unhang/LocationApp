import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './NewPlace.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          console.log(inputId);
          isFormValid = isFormValid && action.isValid
        } else {
          isFormValid = isFormValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.val,
            isValid: action.isValid
          }
        },
        isValid: isFormValid
      }
    default:
      return state
  }
}

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type: 'INPUT_CHANGE', inputId: id, val: value, isValid: isValid})
  }, []);

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (<form className="place-form">
    <Input
      id="title"
      element="input"
      type="text"
      label="Title"
      errorText="Your input was error"
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
    />
    <Input
      id="description"
      element="textarea"
      type="text"
      label="Description"
      errorText="Your input was required at least 5 characters"
      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
      onInput={inputHandler}
    />
    <Input 
      id="address"
      element="input"
      type="text"
      label="Address"
      errorText="Your input was required at least 5 characters"
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
    />
    <Button disabled={!formState.isValid} onClick={placeSubmitHandler}>
      ADD PLACE
    </Button>
  </form>);
}

export default NewPlace;