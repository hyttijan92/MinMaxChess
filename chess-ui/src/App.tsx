
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
import Scores from "./routes/Scores";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
function App() {

    const dispatch = useAppDispatch();
    const user_uuid = useAppSelector(selectUserUUID);
    useEffect(()=>{
        dispatch(initializeGameState(user_uuid));
    })
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GameConfiguration />} />
                <Route path="/game" element={<Game />} />
                <Route path="/engines" element={<Engines />} />
                <Route path="/scores" element={<Scores />} />
            </Routes>
        </Router>
    )
}
export default App;