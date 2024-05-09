import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { store } from "./stores/rootStore.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);