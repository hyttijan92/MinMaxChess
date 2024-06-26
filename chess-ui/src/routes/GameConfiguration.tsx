import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorBar from "../components/ErrorBar";
import { startGame, selectUserUUID, selectGameState,selectGameUIState, setError, setLoading } from "../stores/rootStore";
import * as api from "../api/api";
import { errorHandler } from "../utils/utilFunctions";
import { IError } from "../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../stores/hooks";

function GameConfiguration() {
    const [gameEngine, setGameEngine] = useState("RANDOM")
    const [color, setColor] = useState("WHITE")
    const user_uuid = useAppSelector(selectUserUUID)
    const gameState = useAppSelector(selectGameState);
    const gameUIState = useAppSelector(selectGameUIState);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        try {
            dispatch(setLoading(true))
            const game = await api.createGameApi(user_uuid, gameEngine, color)
            dispatch(startGame({ ...game, pendingMove: undefined, aiStarts: color !== "WHITE" }))
            dispatch(setLoading(false))
            navigate("/game")
        }
        catch(e: unknown){
            dispatch(setError({message:errorHandler(e as IError)}))
            dispatch(setLoading(false))
            setTimeout(() =>dispatch(setError(undefined)),5000)
        }
        
    }
    return (
        <>
            <Header />
            {gameUIState.error &&
            <ErrorBar/>
            }
            <div className="container mx-auto grid justify-center">
                {gameState === undefined ?
                    <>
                        <h1 className={"text-2xl"}>Game configuration</h1>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl" htmlFor="game-engine">Choose game engine</label>
                            <select id="game-engine" disabled={gameUIState.loading} className={"text-xl px-16"} value={gameEngine} onChange={(event) => setGameEngine(event.target.value)}>
                                <option value="RANDOM">Random</option>
                                <option value="MINMAX">MinMax</option>
                                <option value="ALPHABETA">AlphaBeta</option>
                                <option value="ITERATIVEDEEPENING">Iterative deepening</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl" htmlFor="color">Choose color</label>
                            <select id="color" disabled={gameUIState.loading} className={"text-xl px-16"} value={color} onChange={(event) => setColor(event.target.value)}>
                                <option value="WHITE">White</option>
                                <option value="BLACK">Black</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <button className={"bg-blue-500 text-white px-8 py-4 rounded-full text-xl"} disabled={gameUIState.loading} onClick={handleClick}>Start a new a game</button>
                        </div>
                    </>
                    :
                    <>
                        <h1 >You VS {gameState.game_engine}</h1>
                        <div className="mb-4">
                            <NavLink to="/game"><button className={"bg-blue-500 text-white px-8 py-4 rounded-full text-xl"}>Continue game</button></NavLink>
                        </div>
                    </>
                }
            </div>
            <Loading/>
        </>
    )
}
export default GameConfiguration;