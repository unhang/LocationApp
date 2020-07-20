import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { signUp } from "../../services/user.api";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Auth.css";
import { API_ENDPOINT } from "../../shared/util/constant";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setLoginMode] = useState(true);
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormState] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const {
      inputs: { email, name, password },
    } = formState;

    if (isLoginMode) {
      try {

        const responseData = await sendRequest(
          `${API_ENDPOINT}/user/login`,
          "POST",
          JSON.stringify({
            email: email.value,
            password: password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.user.id);
        history.push("/");
      } catch (err) {}
    } else {
      const response = await signUp({
        email: email.value,
        password: password.value,
        name: name.value,
      });
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormState(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormState(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={submit}>
        {!isLoginMode && (
          <Input
            id="name"
            label="User name"
            element="input"
            type="input"
            placeholder="name"
            errorText="name is invalid"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          label="Email address"
          element="input"
          type="input"
          placeholder="email"
          errorText="Email is invalid"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          label="Password"
          type="password"
          placeholder="password"
          errorText="Password is invalid"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>

      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
