import { IError } from "../interfaces/interfaces";
export const getUserStateFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem("user") || '{}');
}
export const saveUserStateToLocalStorage = (state: string) =>{
    localStorage.setItem("user",state);
}

export const getUserState = () =>{
    let userState = getUserStateFromLocalStorage();
    if(userState === undefined){
        userState = {user_uuid: crypto.randomUUID()}
        saveUserStateToLocalStorage(JSON.stringify(userState));
        return userState;
    }
    else{
        return userState;
    }
}
export const errorHandler = (error: IError) =>{

    switch(error.message){
        case "Failed to fetch":
            return "Connection error. Try refreshing the page."
        case "400":
            return "Bad request was made."
        default:
            return "Unknown error."
    }
}