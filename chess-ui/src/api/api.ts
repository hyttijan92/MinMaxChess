
const apiUrl = process.env.REACT_APP_API_URL || "/api";
export const getCurrentGameApi = async (user_uuid: string) => {
    try {
        const response = await fetch(`${apiUrl}/current_game/${user_uuid}`)
        if (response.status === 200) {
            const json = await response.json();
            return json;
        }
        else if (response.status === 404) {
            return undefined;
        }
        else {
            throw new Error(response.status.toString())
        }
    } catch (e) {
        throw e;
    }

}
export const getPreviousGamesApi = async (page: number) => {
    try {
        const response = await fetch(`${apiUrl}/previous_games?page=${page}`)
        if (response.status === 200) {
            const json = await response.json();
            return json;
        }
        else if (response.status === 404) {
            return [];
        }
        else {
            throw new Error(response.status.toString())
        }
    } catch (e) {
        throw e;
    }

}

export const createGameApi = async (user_uuid: string, gameEngine: string, color: string) => {
    const response = await fetch(`${apiUrl}/create_game`, {
        method: "POST",
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
export const makeGameMoveApi = async (user_uuid: string, game_id: number, fen: string) => {

    const data = {
        user_uuid: user_uuid,
        game_id: game_id,
        fen: fen
    }

    const response = await fetch(`${apiUrl}/move`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();
    return json;
}
export const resignApi = async (game_id: number) => {
    const data = {
        game_id: game_id
    }
    const response = await fetch(`${apiUrl}/resign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const json = await response.json();
    return json;
}
export const drawApi = async (game_id: number) => {
    const data = {
        game_id: game_id
    }
    const response = await fetch(`${apiUrl}/draw`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const json = await response.json();
    return json;
}