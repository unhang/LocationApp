import axios from "axios";
import { API_ENDPOINT } from "../shared/util/constant";

const signUp = ({ email, password, name }) => {
  return axios
    .post(`${API_ENDPOINT}/user/signup`, {
      email,
      password,
      name,
    })
    .then((res) => res)
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

const login = ({ email, password }) => {
  return axios
    .post(`${API_ENDPOINT}/user/login`, {
      email,
      password,
    })
    .then((res) => res)
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

export { signUp, login };
