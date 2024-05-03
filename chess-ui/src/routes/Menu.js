import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import {action} from "mobx";
function Menu(){
    
    @action
    const test = () =>{

    }
    return(
        <>
            <Header/>
            <div className="container mx-auto">
                <h1 className={"text-2xl"}>MinMax chess menu</h1>
                <NavLink to="/game_configuration"><button>Start a new a game</button></NavLink>
                <NavLink to="/engines"><button>Engines</button></NavLink>
                <NavLink to="/about"><button>About</button></NavLink>
            </div>
        </>
    )
}
export default Menu;