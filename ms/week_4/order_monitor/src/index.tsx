import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { StoreState } from "./types";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import App from "./App";

const sagaMiddleware = createSagaMiddleware();
const store: StoreState = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
const rootElement: HTMLElement = document.getElementById("root");

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
