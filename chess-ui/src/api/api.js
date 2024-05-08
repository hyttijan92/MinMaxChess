export const getCurrentGameApi = async(user_uuid) =>{
    try{
        const response = await fetch(`/api/current_game/${user_uuid}`)
        const json = await response.json();
        return json;
    } catch(e){
        return null;
    }
    
} 

export const createGameApi = async(user_uuid,gameEngine,color) =>{
    const response = await fetch("/api/create_game",{
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
  
      const response = await fetch("/api/move",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const json = await response.json();
      return json;
}