import { combineReducers } from "redux";
import { appReducer } from "./appReducer";

export const rootReducer: any = combineReducers({
  app: appReducer,
});
