import { combineReducers } from "redux";
import { appReducer } from "./app/actions";
import { gatewayListReducer } from "./gatewayList/actions";

const rootReducer = combineReducers({
  app: appReducer,
  gatewayList: gatewayListReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
