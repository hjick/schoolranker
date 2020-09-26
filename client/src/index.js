import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./_reducers";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUserCircle,
  faSearch,
  faArrowLeft,
  faSchool,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faToggleOn,
  faToggleOff,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";
ReactGA.initialize("UA-179115620-1", {
  debug: true,
  titleCase: false,
});

// FontAwesome
library.add(
  fab,
  faUserCircle,
  faSearch,
  faArrowLeft,
  faSchool,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faToggleOn,
  faToggleOff,
  faMedal
);

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
