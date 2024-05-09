
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Game from "./routes/Game";
import GameConfiguration from "./routes/GameConfiguration"
import Engines from "./routes/Engines";
import { useEffect } from "react";
import { initializeGameState, selectUserUUID } from "./stores/rootStore";
import { useDispatch, useSelector } from "react-redux";
import Scores from "./routes/Scores";
function App() {

    const dispatch = useDispatch();
    const user_uuid = useSelector(selectUserUUID);
    useEffect(()=>{
        dispatch(initializeGameState(user_uuid));
    })
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<GameConfiguration />} />
                <Route path="/game" element={<Game />} />
                <Route path="/engines" element={<Engines />} />
                <Route path="/scores" element={<Scores />} />
            </Routes>
        </Router>
    )
}
export default App;