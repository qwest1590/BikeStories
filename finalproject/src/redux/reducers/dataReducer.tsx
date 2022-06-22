import { Officers } from "../../components/Officers/Officers";

const InitialState = {
  officers: [],
  cases: [],
  isFetching: false,
  messageForUser: {
    type: null,
    message: null,
  },
  officerOnEdit: {},
};
interface IDataState {
  officers: object[];
  cases: object[];
  isFetching: boolean;
  messageForUser: object;
  officerOnEdit: object;
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
    case "DELETE_OFFICER_BY_ID_STARTED":
      return {
        ...state,
        isFetching: true,
      };
    case "DELETE_OFFICER_BY_ID_SUCCESS":
      return {
        ...state,
        isFetching: false,
      };
    case "DELETE_OFFFICER_BY_ID_FAILURE":
      return {
        ...state,
        isFetching: false,
      };
    // case "RESET_DATA_STATE":
    //   return {
    //     ...state,
    //     messageForUser: {
    //       type: null,
    //       message: null,
    //     },
    //   };
    case "EDIT_OFFICER_OPENED":
      const obj = action.payload;
      delete obj.password;

      return {
        ...state,
        officerOnEdit: obj,
      };
    case "EDIT_OFFICER_DATA_STARTED":
      return {
        ...state,
        isFetching: true,
        officerOnEdit: action.payload,
      };
    case "EDIT_OFFICER_DATA_SUCCESS":
      return {
        ...state,
        isFetching: false,
      };
    case "EDIT_OFFICER_DATA_FAILURE":
      return {
        ...state,
        isFetching: false,
        messageForUser: action.payload,
      };
    case "EDIT_OFFICER_CLOSED":
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
