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
        store.dispatch(start_game({ ...game, pending_move: null, ai_starts: color !== "WHITE" }))
        navigate("/game")
    }
    return (
        <>
            <Header />
            <div className="container mx-auto grid justify-center">
                {gameState === null ?
                    <>
                        <h1 className={"text-2xl"}>Game configuration</h1>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl" htmlFor="game_engine">Choose game engine</label>
                            <select className={"text-xl px-16"} value={gameEngine} onChange={(event) => setGameEngine(event.target.value)}>
                                <option value="RANDOM">Random</option>
                                <option value="MINMAX">MinMax</option>
                                <option value="ALPHABETA">Alphabeta</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl" htmlFor="color">Choose color</label>
                            <select className={"text-xl px-16"} value={color} onChange={(event) => setColor(event.target.value)}>
                                <option value="WHITE">White</option>
                                <option value="BLACK">Black</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <button className={"bg-blue-500 text-white px-8 py-4 rounded-full text-xl"} onClick={handleClick}>Start a new a game</button>
                        </div>
                    </>
                    :
                    <NavLink to="/game"><button>Continue game</button></NavLink>
                }
            </div>
        </>
    )
}
export default GameConfiguration;