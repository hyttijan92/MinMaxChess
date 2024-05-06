import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import { store, start_game, selectUserUUID, selectGameState } from "../stores/rootStore.js";
import { useSelector } from "react-redux";
import * as api from "../api/api.js";
function GameConfiguration() {
    const [gameEngine, setGameEngine] = useState("RANDOM")
    const [color, setColor] = useState("WHITE")
    const user_uuid = useSelector(selectUserUUID)
    const gameState = useSelector(selectGameState);
    const navigate = useNavigate()

    const handleClick = async () => {
        const game = await api.createGameApi(user_uuid, gameEngine, color)
        store.dispatch(start_game(game))
        navigate("/game")
    }
    return (
        <>
            <Header />
            <div className="container mx-auto">
                {gameState === null ?
                    <>
                        <h1 className={"text-2xl"}>Game configuration</h1>
                        <label htmlFor="game_engine">Choose game engine</label>
                        <select value={gameEngine} onChange={(event) => setGameEngine(event.target.value)}>
                            <option value="RANDOM">Random</option>
                            <option value="MINMAX">MinMax</option>
                            <option value="ALPHABETA">Alphabeta</option>
                        </select>
                        <label htmlFor="color">Choose color</label>
                        <select value={color} onChange={(event) => setColor(event.target.value)}>
                            <option value="WHITE">White</option>
                            <option value="BLACK">Black</option>
                        </select>
                        <button onClick={handleClick}>Start a new a game</button>
                    </>
                    :
                    <NavLink to="/game"><button>Continue game</button></NavLink>
                }
            </div>
        </>
    )
}
export default GameConfiguration;