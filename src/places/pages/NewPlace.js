import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import './PlaceForm.css';
import {useForm} from '../../shared/hooks/form-hook';


const NewPlace = () => {
  const initialInput = {
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  }
  // const initialFormValidity = false;
  const [formState, inputHandler] = useForm( initialInput, false);

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
    </form>
  );
}

export default NewPlace;
