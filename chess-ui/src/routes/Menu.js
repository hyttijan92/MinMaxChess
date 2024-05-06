import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import {store} from "../stores/rootStore.js"
function Menu(){
    
    console.log(store.getState().game);

    return(
        <>
            <Header/>
            <div className="container mx-auto">
                <h1 className={"text-2xl"}>MinMax chess menu</h1>
                <NavLink to="/game_configuration">
                    <button className={"bg-blue-500 text-white px-4 rounded-full"}>Start a new a game</button>
                </NavLink>
                <NavLink to="/engines">
                    <button className={"bg-blue-500 text-white px-4 rounded-full"}>
                        Engines
                    </button>
                </NavLink>
                <NavLink to="/about">
                    <button className={"bg-blue-500 text-white px-4 rounded-full"}>
                        About
                    </button>
                </NavLink>
            </div>
        </>
    )
}
export default Menu;