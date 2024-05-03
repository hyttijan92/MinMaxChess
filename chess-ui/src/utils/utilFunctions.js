export const getStateFromLocalStorage = () =>{
    return localStorage.getItem("game");
}
export const saveStateToLocalStorage = (state) =>{
    localStorage.setItem("game",state);
}