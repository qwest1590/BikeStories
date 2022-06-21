const InitialState = {
  officers: [],
  cases: [],
  isFetching: false,
  messageForUser: {
    type: null,
    message: null,
  },
};
interface IDataState {
  officers: object[];
  cases: object[];
  isFetching: boolean;
  messageForUser: object;
}

export const dataReducer = (state: IDataState = InitialState, action: any) => {
  switch (action.type) {
    case "GETALLOFFICERS_STARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "GETALLOFFICERS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        officers: action.payload,
      };
    case "GETALLOFFICERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        messageForUser: "Can't Resolve Officers List,try again later",
      };
    case "REPORTATHEFT_STARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "REPORTATHEFT_SUCCESS":
      return {
        ...state,
        isFetching: false,
        messageForUser: {
          type: "success",
          message: "Successfully created",
        },
      };
    case "REPORTATHEFT_FAILURE":
      return {
        ...state,
        isFetching: false,
        messageForUser: {
          type: "error",
          message: action.payload,
        },
      };
    case "CLEARDATA_MESSAGE":
      return {
        ...state,
        messageForUser: {
          type: null,
          message: null,
        },
      };
    default:
      return state;
  }
};
