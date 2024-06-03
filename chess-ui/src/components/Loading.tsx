import { useEffect, useState } from "react";
import { selectGameUIState } from "../stores/rootStore";
import { useAppSelector } from "../stores/hooks";

function Loading(){
    const gameUIState = useAppSelector(selectGameUIState);
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