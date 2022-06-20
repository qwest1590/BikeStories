import { useNavigate } from "react-router-dom";

const initialState = {
  isFetching: false,
  error: "",
  redirectTo: "",
  loginnedUser: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    approved: false,
  },
};

interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  approved: boolean;
}

interface IAppState {
  isFetching: boolean;
  error: string;
  redirectTo: string;
  loginnedUser: IUser;
}
export const appReducer = (state: IAppState = initialState, action: any) => {
  switch (action.type) {
    case "SIGNUPSTARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "SIGNUPSUCCESS":
      return {
        ...state,
        isFetching: false,
        error: "",
        redirectTo: action.payload,
      };
    case "SIGNUPFAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "CLEARLASTERROR":
      return {
        ...state,
        error: "",
      };
    case "SIGNINSTARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "SIGNINSUCCESS":
      const user = Object.assign({}, action.payload);
      return {
        ...state,
        isFetching: false,
        loginnedUser: user,
        error: "",
      };
    case "SIGNINFAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
