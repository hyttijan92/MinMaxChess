
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<GameConfiguration />} />
                <Route path="/game" element={<Game />} />
                <Route path="/engines" element={<Engines />} />
            </Routes>
        </Router>
    )
}
export default App;