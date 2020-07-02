import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setLoginMode] = useState(true);
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

  const submit = (e) => {
    e.preventDefault();
    console.log(formState);
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
          validators={[VALIDATOR_MINLENGTH(6)]}
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
