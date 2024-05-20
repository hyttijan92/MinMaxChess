import { useSelector } from "react-redux"
import {selectGameUIState} from "../stores/rootStore"
function ErrorBar(){

    const gameUIState = useSelector(selectGameUIState)
    const error = gameUIState.error;
    return(
        <div className={"bg-red-200 border-solid border-2 rounded m-4 border-red-400"}>
            <p>
            {error.message}
            </p>
        </div>
    )
}
export default ErrorBar;