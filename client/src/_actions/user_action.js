import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGIN_FACEBOOK,
  MODIFY_SUMMONER,
  MODIFY_SCHOOL,
} from "./types";

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const authFacebook = () => {
  const request = axios
    .get("/api/users/authfacebook")
    .then((response) => response.data);

  return {
    type: LOGIN_FACEBOOK,
    payload: request,
  };
};

export const auth = () => {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};

export const modifySummoner = (data) => {
  const request = axios
    .post("/api/users/modify/summoner", data)
    .then((response) => response.data);

  return {
    type: MODIFY_SUMMONER,
    payload: request,
  };
};
export const modifySchool = (data) => {
  const request = axios
    .post("/api/users/modify/school", data)
    .then((response) => response.data);

  return {
    type: MODIFY_SCHOOL,
    payload: request,
  };
};
