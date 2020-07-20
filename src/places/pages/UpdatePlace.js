import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { API_ENDPOINT } from "../../shared/util/constant";
import "./PlaceForm.css";

const UpdatePlace = () => {
  const [loadedPlace, setLoadedPlace] = useState(null);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${API_ENDPOINT}/place/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [placeId, sendRequest]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${API_ENDPOINT}/place/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.goBack();
    } catch (err) {}
  };

  if (error) {
    return (
      <div className="center">
        <ErrorModal onClear={clearError} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }
  return (
    <React.Fragment>
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            errorText="Your input was error"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValidity={true}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            errorText="Need at least 5 char"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValidity={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
