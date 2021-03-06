import {
  AUTH_AFTER_REFRESH_FAILURE,
  AUTH_AFTER_REFRESH_STARTED,
  AUTH_AFTER_REFRESH_SUCCESS,
  CLEARDATA_MESSAGE,
  CLEAR_MESSAGE,
  DELETE_CASE_BY_ID_FAILURE,
  DELETE_CASE_BY_ID_STARTED,
  DELETE_CASE_BY_ID_SUCCESS,
  DELETE_OFFICER_BY_ID_FAILURE,
  DELETE_OFFICER_BY_ID_STARTED,
  DELETE_OFFICER_BY_ID_SUCCESS,
  EDIT_CASE_BY_ID_FAILURE,
  EDIT_CASE_BY_ID_STARTED,
  EDIT_CASE_BY_ID_SUCCESS,
  EDIT_CASE_CLOSED,
  EDIT_CASE_OPENED,
  EDIT_OFFICER_BY_ID_FAILURE,
  EDIT_OFFICER_BY_ID_STARTED,
  EDIT_OFFICER_BY_ID_SUCCESS,
  EDIT_OFFICER_CLOSED,
  EDIT_OFFICER_OPENED,
  GETALLOFFICERS_FAILURE,
  GETALLOFFICERS_STARTED,
  GETALLOFFICERS_SUCCESS,
  GET_ALL_CASES_FAILURE,
  GET_ALL_CASES_STARTED,
  GET_ALL_CASES_SUCCESS,
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
import { IOfficer } from "../../components/pages/Officers/Officers";
import { ITheft } from "../../components/pages/TheftArchive/TheftArchive";

//  const token: any = localStorage.getItem("token");
// const myClientID = "b3281778-83ca-4e32-b31b-c6452857a6c6";

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
  method: string,
  token?: boolean,
  body?: any
) => {
  const TOKEN: any = localStorage.getItem("token");
  const response = await fetch(API_URL + url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      Authorization: token ? `bearer ${TOKEN}` : "",
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
          dispatch(getAllOfficers());
          dispatch(getAllCases());
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const reportATheftPublic = (theft: ITheft) => {
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

export const reportATheftAuth = (theft: ITheft) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(reportATheftStarted());
    const response = fetchApiAuth("cases", "POST", true, theft);
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
    const response = fetchApiAuth(`officers/${id}`, "DELETE", true);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(deleteOfficerByIdFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(deleteOfficerByIdSuccess(id));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const deleteCaseById = (id: string) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(deleteCaseByIdStarted());
    const response = fetchApiAuth(`cases/${id}`, "DELETE", true);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(deleteCaseByIdFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(deleteCaseByIdSuccess());
          dispatch(getAllCases());
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const editOfficerById = (officer: IOfficer) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(editOfficerByIdStarted(officer));
    const response = fetchApiAuth(
      `officers/${officer._id}`,
      "PUT",
      true,
      officer
    );
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(editOfficerByIdFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(editOfficerByIdSuccess(res.data));
          setTimeout(() => {
            history.replace("/officers");
          }, 500);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const EditCaseById = (theft: ITheft) => {
  return async (dispatch: TypedDispatch) => {
    dispatch(editCaseByIdStarted());
    const response = fetchApiAuth(`cases/${theft._id}`, "PUT", true, theft);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(editCaseByIdFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(editCaseByIdSuccess(res.data));
          setTimeout(() => {
            history.replace("/cases");
            dispatch(editCaseClosed());
          }, 500);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const getAllOfficers = () => {
  return async (dispatch: TypedDispatch) => {
    dispatch(getAllOfficersStarted());
    const response = fetchApiAuth("officers/", "GET", true);
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

export const getAllCases = () => {
  return async (dispatch: TypedDispatch) => {
    dispatch(getAllCasesStarted());
    const response = fetchApiAuth("cases/", "GET", true);
    response
      .then((res) => {
        if (res.status === "ERR") {
          dispatch(getAllCasesFailure(res.message));
        }
        if (res.status === "OK") {
          dispatch(getAllCasesSuccess(res.data));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const authAfterRefresh = () => {
  return async (dispatch: TypedDispatch) => {
    dispatch(authAfterRefreshStarted());
    const token = localStorage.getItem("token");
    if (token) {
      const response = fetchApiAuth("auth/", "GET", true);
      response
        .then((res) => {
          if (res.status === "ERR") {
            dispatch(authAfterRefreshFailure());
          }
          if (res.status === "OK") {
            dispatch(authAfterRefreshSuccess(res.data.user));
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else dispatch(authAfterRefreshFailure());
  };
};

export const authAfterRefreshStarted = () => {
  return {
    type: AUTH_AFTER_REFRESH_STARTED,
  };
};

export const authAfterRefreshSuccess = (payload: IOfficer) => {
  return {
    type: AUTH_AFTER_REFRESH_SUCCESS,
    payload,
  };
};

export const authAfterRefreshFailure = () => {
  return {
    type: AUTH_AFTER_REFRESH_FAILURE,
  };
};

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

export const signUpFailure = (error: string) => {
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

export const signInFailure = (error: string) => {
  return {
    type: SIGNIN_FAILURE,
    payload: error,
  };
};

export const logOut = () => {
  history.push("/");
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};

export const resetDataState = () => {
  return {
    type: RESET_DATA_STATE,
  };
};

export const getAllOfficersStarted = () => {
  return {
    type: GETALLOFFICERS_STARTED,
  };
};

export const getAllOfficersSuccess = (payload: IOfficer[]) => {
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

export const reportATheftFailure = (error: string) => {
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

export const deleteOfficerByIdSuccess = (id: string) => {
  return {
    type: DELETE_OFFICER_BY_ID_SUCCESS,
    payload: id,
  };
};

export const deleteOfficerByIdFailure = (error: string) => {
  return {
    type: DELETE_OFFICER_BY_ID_FAILURE,
    payload: error,
  };
};

export const editOfficerOpened = (officer: object) => {
  return {
    type: EDIT_OFFICER_OPENED,
    payload: officer,
  };
};

export const editOfficerByIdStarted = (officer: IOfficer) => {
  return {
    type: EDIT_OFFICER_BY_ID_STARTED,
    payload: officer,
  };
};

export const editOfficerByIdSuccess = (officer: IOfficer) => {
  return {
    type: EDIT_OFFICER_BY_ID_SUCCESS,
    payload: officer,
  };
};

export const editOfficerByIdFailure = (error: string) => {
  return {
    type: EDIT_OFFICER_BY_ID_FAILURE,
    payload: error,
  };
};

export const editOfficerClosed = () => {
  return {
    type: EDIT_OFFICER_CLOSED,
  };
};

export const getAllCasesStarted = () => {
  return {
    type: GET_ALL_CASES_STARTED,
  };
};

export const getAllCasesSuccess = (payload: ITheft[]) => {
  return {
    type: GET_ALL_CASES_SUCCESS,
    payload,
  };
};

export const getAllCasesFailure = (error: string) => {
  return {
    type: GET_ALL_CASES_FAILURE,
    payload: error,
  };
};

export const deleteCaseByIdStarted = () => {
  return {
    type: DELETE_CASE_BY_ID_STARTED,
  };
};

export const deleteCaseByIdSuccess = () => {
  return {
    type: DELETE_CASE_BY_ID_SUCCESS,
  };
};

export const deleteCaseByIdFailure = (error: string) => {
  return {
    type: DELETE_CASE_BY_ID_FAILURE,
    payload: error,
  };
};

export const editCaseOpened = (theft: ITheft) => {
  return {
    type: EDIT_CASE_OPENED,
    payload: theft,
  };
};

export const editCaseByIdStarted = () => {
  return {
    type: EDIT_CASE_BY_ID_STARTED,
  };
};

export const editCaseByIdSuccess = (theft: ITheft) => {
  return {
    type: EDIT_CASE_BY_ID_SUCCESS,
    payload: theft,
  };
};

export const editCaseByIdFailure = (error: string) => {
  return {
    type: EDIT_CASE_BY_ID_FAILURE,
    payload: error,
  };
};

export const editCaseClosed = () => {
  return {
    type: EDIT_CASE_CLOSED,
  };
};
