import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./App";
import rootReducer from "./store/modules";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

/** Redux DevTools 사용하기 위함 */
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

/** createStore(redux)를 대신해서 configureStore(@reduxjs/toolkit)를 공식적으로 추천하는 중 */
const store = configureStore(
  {
    reducer: {
      rootReducer,
    },
  },
  devTools
);

console.log(store.getState());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
