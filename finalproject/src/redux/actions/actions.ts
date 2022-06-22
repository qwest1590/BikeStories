import {
  CLEARDATA_MESSAGE,
  CLEAR_MESSAGE,
  DELETE_OFFICER_BY_ID_STARTED,
  DELETE_OFFICER_BY_ID_SUCCESS,
  EDIT_OFFICER_CLOSED,
  EDIT_OFFICER_DATA_STARTED,
  EDIT_OFFICER_DATA_SUCCESS,
  EDIT_OFFICER_OPENED,
  GETALLOFFICERS_FAILURE,
  GETALLOFFICERS_STARTED,
  GETALLOFFICERS_SUCCESS,
  LOGOUT,
  REPORTATHEFT_FAILURE,
  REPORTATHEFT_STARTED,
  REPORTATHEFT_SUCCESS,
  RESET_DATA_STATE,
  SIGNIN_FAILURE,
  SIGNIN_STARTED,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_STARTED,
  SIGNUP_SUCCESS,
} from "../types/types";
import { history, TypedDispatch } from "../..";
import { IOfficer } from "../../components/Officers/Officers";

const token: any = localStorage.getItem("token");

const API_URL = "https://sf-final-project.herokuapp.com/api/";

const fetchApiPostUnAuth = async (url: string, body: object) => {
  const response = await fetch(API_URL + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const fetchApiAuth = async (
  url: string,
  token: string,
  method: string,
  body?: any
) => {
  const response = await fetch(API_URL + url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const signUpUser = (user: object) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(signUpStarted());
    const response = fetchApiPostUnAuth("auth/sign_up", user);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(signUpFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(signUpSuccess());
          setTimeout(() => {
            history.replace("/");
          }, 1000);
          setTimeout(() => {
            dispatch(clearMesssage());
          }, 1200);
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
    const response = fetchApiPostUnAuth("auth/sign_in", user);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(signInFailure(res.message));
        }
        if (res.status === "OK") {
          localStorage.setItem("token", res.data.token);
          dispatch(signInSuccess(res.data.user));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const reportATheft = (theft: object) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(reportATheftStarted());
    const response = fetchApiPostUnAuth("public/report", theft);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(reportATheftFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(reportATheftSuccess());
          setTimeout(() => {
            history.replace("/");
          }, 1000);
          setTimeout(() => {
            dispatch(clearDataMessage());
          }, 1200);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const deleteOfficerById = (id: string) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(deleteOfficerByIdStarted());
    const response = fetchApiAuth(`officers/${id}`, token, "DELETE");
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(deleteOfficerByIdFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(deleteOfficerByIdSuccess());
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const editOfficerById = (officer: IOfficer) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(editOfficerDataStarted(officer));
    const response = fetchApiAuth(
      `officers/${officer._id}`,
      token,
      "PUT",
      officer
    );
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(editOfficerDataFailure(res.message));
        }
        if (res.status === "OK") {
          console.log(res.data, "RES");
          dispatch(editOfficerDataSuccess(res.data));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

// export const editOfficerById = (officer: IOfficer) => {
//   return async (dispatch: TypedDispatch) => {
//     dispatch(editOfficerDataStarted(officer));
//     const response = await fetch(
//       `https://sf-final-project.herokuapp.com/api/officers/${officer._id}`,
//       {
//         method: "PUT",
//         body: JSON.stringify(officer),
//         headers: {
//           Authorization: `bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     response.json().then((data) => console.log(data));
//   };
// };

export const signUpStarted = () => {
  return {
    type: SIGNUP_STARTED,
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signUpFailure = (error: any) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const clearMesssage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};

export const signInStarted = () => {
  return {
    type: SIGNIN_STARTED,
  };
};

export const signInSuccess = (payload: object) => {
  return {
    type: SIGNIN_SUCCESS,
    payload,
  };
};

export const signInFailure = (error: any) => {
  return {
    type: SIGNIN_FAILURE,
    payload: error,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};

export const getAllOfficers = () => {
  return async (dispatch: TypedDispatch) => {
    dispatch(getAllOfficersStarted());
    const response = fetchApiAuth("officers/", token, "GET");
    response
      .then((res) => {
        if (!res) {
          dispatch(getAllOfficersFailure());
        }
        if (res) {
          dispatch(getAllOfficersSuccess(res.officers));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const getAllOfficersStarted = () => {
  return {
    type: GETALLOFFICERS_STARTED,
  };
};

export const getAllOfficersSuccess = (payload: []) => {
  return {
    type: GETALLOFFICERS_SUCCESS,
    payload,
  };
};

export const getAllOfficersFailure = () => {
  return {
    type: GETALLOFFICERS_FAILURE,
  };
};

export const reportATheftStarted = () => {
  return {
    type: REPORTATHEFT_STARTED,
  };
};

export const reportATheftSuccess = () => {
  return {
    type: REPORTATHEFT_SUCCESS,
  };
};

export const reportATheftFailure = (error: any) => {
  return {
    type: REPORTATHEFT_FAILURE,
    payload: error,
  };
};

export const clearDataMessage = () => {
  return {
    type: CLEARDATA_MESSAGE,
  };
};

export const deleteOfficerByIdStarted = () => {
  return {
    type: DELETE_OFFICER_BY_ID_STARTED,
  };
};

export const deleteOfficerByIdSuccess = () => {
  return {
    type: DELETE_OFFICER_BY_ID_SUCCESS,
  };
};

export const deleteOfficerByIdFailure = (error: any) => {
  return {
    type: DELETE_OFFICER_BY_ID_SUCCESS,
    payload: error,
  };
};

// export const resetDataState = () => {
//   return {
//     type: RESET_DATA_STATE,
//   };
// };

export const editOfficerOpened = (officer: object) => {
  return {
    type: EDIT_OFFICER_OPENED,
    payload: officer,
  };
};

export const editOfficerDataStarted = (officer: IOfficer) => {
  return {
    type: EDIT_OFFICER_DATA_STARTED,
    payload: officer,
  };
};

export const editOfficerDataSuccess = (officer: IOfficer) => {
  return {
    type: EDIT_OFFICER_DATA_SUCCESS,
    payload: officer,
  };
};

export const editOfficerDataFailure = (error: any) => {
  return {
    type: EDIT_OFFICER_DATA_SUCCESS,
    payload: error,
  };
};

export const editOfficerCloser = () => {
  return {
    type: EDIT_OFFICER_CLOSED,
  };
};
