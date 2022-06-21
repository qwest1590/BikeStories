import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { dataReducer } from "./dataReducer";

export const rootReducer: any = combineReducers({
  app: appReducer,
  data: dataReducer,
});
