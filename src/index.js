import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import CounterReducer from "./store/reducers/counter";
import ResultReducer from "./store/reducers/result";

const rootReducer = combineReducers({
  ctr: CounterReducer,
  res: ResultReducer
});

const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

// provider passes info to the rest of the app. In this case reducer, which contains the state
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
