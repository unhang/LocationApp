import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
}

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValidity || false,
    isTouched: false
  });

  const { onInput, id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid])

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  }

  const touchHandler = event => {
    dispatch({
      type: 'TOUCH'
    });
  }
  const element =
    props.element === 'input' ?
      (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.row || 3}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
        ></textarea>
      );

  return (
    <div
      className={`form-control ${props.className} ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}
      style={props.style}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );

}

export default Input;

