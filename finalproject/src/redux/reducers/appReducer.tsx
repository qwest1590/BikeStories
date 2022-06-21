const initialState = {
  isFetching: false,
  messageForUser: {
    type: null,
    message: null,
  },
  loginnedUser: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    approved: null,
  },
};

interface IUser {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  approved: boolean | null;
}

interface IAppState {
  isFetching: boolean;
  messageForUser: object;
  loginnedUser: IUser;
}
export const appReducer = (state: IAppState = initialState, action: any) => {
  switch (action.type) {
    case "SIGNUP_STARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isFetching: false,
        messageForUser: {
          type: "success",
          message: "Successfully created",
        },
      };
    case "SIGNUP_FAILURE":
      return {
        ...state,
        isFetching: false,
        messageForUser: {
          type: "error",
          message: action.payload,
        },
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        messageForUser: {
          type: null,
          message: null,
        },
      };
    case "SIGNIN_STARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "SIGNIN_SUCCESS":
      const user = Object.assign({}, action.payload);
      return {
        ...state,
        isFetching: false,
        loginnedUser: user,
        messageForUser: {
          type: null,
          message: null,
        },
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        messageForUser: {
          type: "error",
          message: action.payload,
        },
      };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
