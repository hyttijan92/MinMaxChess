import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'

import Header from "../components/Header";
import {saveStateToLocalStorage, getStateFromLocalStorage } from "../utils/utilFunctions";
function GameConfiguration(){

    const [state,setState] = useState(getStateFromLocalStorage() ? getStateFromLocalStorage() : {game: null})
    const [bot,setBot] = useState("Random")
    const [color,setColor] = useState("White")
    const navigate = useNavigate()
    const startGame = () =>{
        setState({game:{bot:bot,fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}})
        saveStateToLocalStorage(state)
        navigate("/game")
    }
    return(
        <>
            <Header/>
            <div className="container mx-auto">
                <h1 className={"text-2xl"}>Game configuration</h1>
                <label for="bot">Choose bot</label>
                <select value={bot} onChange={(event)=> setBot(event.target.value)}>
                    <option value="Random">Random</option>
                    <option value="MinMax">MinMax</option>
                    <option value="Alphabeta">Alphabeta</option>
                </select>
                <label for="bot">Choose color</label>
                <select value={color} onChange={(event)=> setColor(event.target.value)}>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                </select>
                
                <button onClick={startGame}>Start a new a game</button>
                {state.game !== null &&
                <NavLink to="/game"><button>Continue game</button></NavLink>
                }
            </div>
        </>
    )
}
export default GameConfiguration;