import {
  CLEARLASTERROR,
  LOGOUT,
  SIGNINFAILURE,
  SIGNINSTARTED,
  SIGNINSUCCESS,
  SIGNUPFAILURE,
  SIGNUPSTARTED,
  SIGNUPSUCCESS,
} from "../types/types";
import { TypedDispatch } from "../..";

const fetchApi = async (url: string, method: string, body: object) => {
  const response = await fetch(
    `https://sf-final-project.herokuapp.com/api/${url}`,
    {
      method: `${method}`,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const signUpUser = (user: object) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(signUpStarted());
    const response = fetchApi("auth/sign_up", "POST", user);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(signUpFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(signUpSuccess(user));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const signInUser = (user: object) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(signInStarted());
    const response = fetchApi("auth/sign_in", "POST", user);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(signInFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(signInSuccess(res.data.user));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const signUpStarted = () => {
  return {
    type: SIGNUPSTARTED,
  };
};

export const signUpSuccess = (payload: object) => {
  return {
    type: SIGNUPSUCCESS,
    payload: "/",
  };
};

export const signUpFailure = (error: any) => {
  return {
    type: SIGNUPFAILURE,
    payload: error,
  };
};

export const clearLastError = () => {
  return {
    type: CLEARLASTERROR,
  };
};

export const signInStarted = () => {
  return {
    type: SIGNINSTARTED,
  };
};

export const signInSuccess = (payload: object) => {
  return {
    type: SIGNINSUCCESS,
    payload,
  };
};

export const signInFailure = (error: any) => {
  return {
    type: SIGNINFAILURE,
    payload: error,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};
