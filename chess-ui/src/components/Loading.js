import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGameUIState } from "../stores/rootStore";

function Loading(){
    const gameUIState = useSelector(selectGameUIState);
    const [index, setIndex] = useState(0);
    useEffect(() =>{
        const updateDots = setInterval(()=>{
            setIndex((index+1)%4)
        },500)
    return () => clearInterval(updateDots)
    },[index]);
    const dots = "...";

    return(
        <div>
            {gameUIState.loading &&
            <p className="bg-yellow-50 border-solid border-2 rounded m-4 border-yellow-200">Loading {dots.substring(0,index)}</p>
            }
        </div>
    )
}
export default Loading;