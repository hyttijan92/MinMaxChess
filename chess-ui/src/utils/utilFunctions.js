export const getUserStateFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem("user"));
}
export const saveUserStateToLocalStorage = (state) =>{
    localStorage.setItem("user",state);
}

export const getUserState = () =>{
    let userState = getUserStateFromLocalStorage();
    if(userState === null){
        userState = {user_uuid: crypto.randomUUID()}
        saveUserStateToLocalStorage(JSON.stringify(userState));
        return userState;
    }
    else{
        return userState;
    }
}
export const errorHandler = (error) =>{

    switch(error.message){
        case "Failed to fetch":
            return "Connection error. Try refreshing the page."
        default:
            return "Unknown error."
    }
}