import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import "./index.global.less";
import { configureStore } from "./store/configureStore";
const store = configureStore();
ReactDOM.render(<App store={store}></App>, document.getElementById("root"));
