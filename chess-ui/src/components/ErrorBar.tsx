import {selectGameUIState} from "../stores/rootStore"
import { useAppSelector } from "../stores/hooks";
import { IError } from "../interfaces/interfaces";
function ErrorBar(){

    const gameUIState = useAppSelector(selectGameUIState)
    const error = gameUIState.error as IError;
    return(
        <div className={"bg-red-200 border-solid border-2 rounded m-4 border-red-400"}>
            <p>
            {error.message}
            </p>
        </div>
    )
}
export default ErrorBar;