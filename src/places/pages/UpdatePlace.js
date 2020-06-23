import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Landmark 81',
    description: 'The most famous sky scraper in Vietnam',
    imageUrl: 'https://kinhdoanhdiaoc.net/wp-content/uploads/2017/06/landmark-81-1.jpg',
    address: '20 W 34th St, New York, NY 1001',
    location: {
      lat: 10.7941662,
      lng: 106.7186276
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Landmark 81',
    description: 'The most famous sky scraper in Vietnam',
    imageUrl: 'https://kinhdoanhdiaoc.net/wp-content/uploads/2017/06/landmark-81-1.jpg',
    address: '20 W 34th St, New York, NY 1001',
    location: {
      lat: 10.7941662,
      lng: 106.7186276
    },
    creator: 'u2'
  }
];


const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  const initialInput = {
    title: {
      value: identifiedPlace.title,
      isValid: true
    },
    description: {
      value: identifiedPlace.description,
      isValid: true
    }
  }

  const [formState, inputHandler] = useForm(initialInput, true);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Your input was error"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValidity={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        errorText="Need at least 5 char"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValidity={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default UpdatePlace;
