import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Menu from "./routes/Menu";
import Game from "./routes/Game";
import GameConfiguration from "./routes/GameConfiguration"
import Engines from "./routes/Engines";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu/>
  },
  {
    path: "/game_configuration",
    element: <GameConfiguration/>
  },
  
  {
    path: "/game",
    element:<Game/>,
  },
  {
    path: "/engines",
    element:<Engines/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);