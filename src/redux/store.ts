import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";

const initialState = {};

let middlewares = applyMiddleware();

if (process.env.NODE_ENV === "development") {
  middlewares = applyMiddleware(logger);
}

const store = createStore(rootReducer, initialState, middlewares);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept("./rootReducer", () => {
    // eslint-disable-next-line
    const nextRootReducer = require("./rootReducer").default;
    store.replaceReducer(nextRootReducer);
  });
}

export { store };
