import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./index.css";

import Game from "./routes/Game";
import GameConfiguration from "./routes/GameConfiguration"
import Engines from "./routes/Engines";
import { store } from "./stores/rootStore.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path="/" element={<GameConfiguration />}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/engines" element={<Engines/>}/>
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);