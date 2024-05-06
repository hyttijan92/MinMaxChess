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