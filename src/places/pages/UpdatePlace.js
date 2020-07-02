import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

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
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Loading...</h2>
        </Card>
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
