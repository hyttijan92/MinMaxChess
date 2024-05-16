const apiUrl = process.env.REACT_APP_API_URL || "/api";
export const getCurrentGameApi = async(user_uuid) =>{
    console.log(process.env);
    try{
        const response = await fetch(`${apiUrl}/current_game/${user_uuid}`)
        const json = await response.json();
        return json;
    } catch(e){
        return null;
    }
    
}
export const getPreviousGamesApi = async(page) =>{
    try{
        const response = await fetch(`${apiUrl}/previous_games?page=${page}`)
        const json = await response.json();
        return json;
    } catch(e){
        console.log(e)
        return [];
    }
    
} 

export const createGameApi = async(user_uuid,gameEngine,color) =>{
    const response = await fetch(`${apiUrl}/create_game`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_uuid: user_uuid,
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            game_engine: gameEngine,
            is_white: color === "WHITE" ? true : false
        })
    });
    const json = await response.json()
    return json;
}
export const makeGameMoveApi = async(user_uuid,game_id, fen) =>{

    const data = {
        user_uuid: user_uuid,
        game_id: game_id,
        fen: fen
      }
  
      const response = await fetch(`${apiUrl}/move`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const json = await response.json();
      return json;
}
export const resignApi = async(game_id) =>{
    const data = {
        game_id: game_id
    }
    const response = await fetch(`${apiUrl}/resign`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const json = await response.json();
    return json;
}